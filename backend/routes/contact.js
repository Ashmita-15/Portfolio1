const express = require('express');
const Joi = require('joi');
const Contact = require('../models/Contact');
const { sendContactEmail, sendAutoReply } = require('../utils/email');

const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  subject: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Subject must be at least 5 characters long',
      'string.max': 'Subject cannot exceed 200 characters',
      'any.required': 'Subject is required'
    }),
  message: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 2000 characters',
      'any.required': 'Message is required'
    })
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Extract client info
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Create contact record
    const contact = new Contact({
      ...value,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Send email notifications (contact + auto-reply)
    try {
      await sendContactEmail({
        name: value.name,
        email: value.email,
        subject: value.subject,
        message: value.message,
        timestamp: new Date().toISOString()
      });

      await sendAutoReply({
        name: value.name,
        email: value.email,
        subject: value.subject,
        message: value.message,
        timestamp: new Date().toISOString()
      });

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);

      return res.status(500).json({
        success: false,
        message: 'Failed to send email notifications. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

    // Successful response
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle duplicate submissions
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A message with this email already exists. Please wait before sending another message.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/contact (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-ipAddress -userAgent');

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

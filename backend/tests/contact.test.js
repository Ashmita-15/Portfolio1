const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Create a test app
const app = express();
app.use(express.json());

// Import routes
const contactRoutes = require('../routes/contact');
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

describe('Contact API', () => {
  describe('POST /api/contact', () => {
    it('should create a new contact message', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contactData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Thank you');
    });

    it('should return validation error for invalid email', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contactData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('should return validation error for missing required fields', async () => {
      const contactData = {
        name: 'John Doe'
        // Missing email, subject, message
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contactData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});

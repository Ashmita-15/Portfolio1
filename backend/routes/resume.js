const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /resume or /resume/download
router.get(['/', '/download'], (req, res) => {
  try {
    const resumePath = path.join(__dirname, '../public/Resume.pdf');
    
    // Check if resume file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Stream the file
    const fileStream = fs.createReadStream(resumePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('Error streaming resume:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error downloading resume'
        });
      }
    });

  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resume'
    });
  }
});

module.exports = router;

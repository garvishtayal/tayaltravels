const nodemailer = require('nodemailer');
const Viewer = require('../../Models/viewer');
require('dotenv').config();

const joinController = async (req, res) => {
  try {
    let { username, email } = req.body;

    // Check if username or email is missing
    if (!username && !email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    } else if (!username && email) {
      // Extracting username from email
      const atIndex = email.indexOf('@');
      if (atIndex !== -1) {
        const usernameFromEmail = email.slice(0, atIndex);
        username = usernameFromEmail.replace(/\d+/g, ''); // Remove any numbers
      } else {
        return res.status(400).json({ message: 'Invalid email address.' });
      }
    }
    
    // Create a new viewer document with the provided username and email
    const newViewer = new Viewer({
      username: username,
      email: email
    });

    // Save the new viewer document to the MongoDB database
    await newViewer.save();

    // Sending email using Zoho Mail
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'abhishek@tayaltravels.com',
        pass: process.env.EMAIL_PASS,
      },
    });
    const pdfFilePath = 'https://tayaltravels.sgp1.cdn.digitaloceanspaces.com/attachments/welcome_kit.pdf';

    const pdfAttachment = {
      filename: 'welcome_kit.pdf',
      path: pdfFilePath,
      contentType: 'application/pdf'
    };

    const mailOptions = {
      from: 'Abhishek Tayal abhishek@tayaltravels.com',
      to: email,
      subject: 'Your welcome kit',
      text: `Dear ${username},
      \n\nI really appreciate your interest in my blogging site.
      \n\nYour welcome kit is attached below:
      \nwe will keep providing you with better content.
      \nCome visit us soon again..
      \n\nBest regards,
      \nTayal Travels`,
      attachments: [pdfAttachment] 
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Data saved to MongoDB and email sent successfully.' });
  } catch (error) {
    console.error('Error in joinController:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { joinController };

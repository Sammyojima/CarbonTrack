import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// POST /api/contact — save a new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    // TODO: Optionally send an email here using Nodemailer / SendGrid

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

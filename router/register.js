const express = require("express");
const router = express.Router();
const { generatePDFTicket } = require("../utils/ticketGen");
const { sendWelcomeMail } = require("../utils/mailer");

// Load models
const Registration = require("../models/RegistrationSchema");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Hello from Server!" });
});

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { team, members, payment } = req.body;

    if (!team || !members || !payment) {
      return res.status(422).json({ error: "Empty input fields!" });
    }

    // Create new Team
    const Team = new Registration({ team, members, payment });
    const leader = Team.members.find((member) => member.role === "leader");

    // Save Team data in DB
    await Team.save();

    // Send confirmation mail
    await sendWelcomeMail(leader.name.split()[0], leader.email);

    res.status(200).json({ message: "Registration Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;

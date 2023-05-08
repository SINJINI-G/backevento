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

router.post("/generateticket", async (req, res) => {
  const Teams = await Registration.find({});

  for(var i = 0; i< Teams.length; i++){
    // console.log("idm", Teams[i]._id);
  
    const ticketData = {
      TICKET_ID: Teams[i]._id.toString(),
      TEAM_NAME: Teams[i].team.teamName,
    };
  
    // PDF ticket gen
    let resp = await generatePDFTicket(ticketData);
    if(!resp)
      res.status(422).json({ message: "Ticket error" });
  }

  res.status(200).json({ message: "done" });
});

module.exports = router;

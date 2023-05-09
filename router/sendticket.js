const express = require("express");
const router = express.Router();
const { generatePDFTicket } = require("../utils/ticketGen");
const { sendEventMail } = require("../utils/mailer");
const auth = require("../utils/auth");
// Load models
const Registration = require("../models/RegistrationSchema");



//Ticket Generation route
router.post("/sendtickets", auth, async (req, res) => {
    const Teams = await Registration.find({});
    // console.log(Teams);
    for(var i = 0; i< Teams.length; i++){
      // console.log("idm", Teams[i]._id); 


      var ticketData = {
        TICKET_ID: Teams[i]._id.toString(),
        TEAM_NAME: Teams[i].team.teamName,
        BG_URL: (i%2==0)?process.env.SLOT1:process.env.SLOT2
      };
    
      // PDF ticket gen            
      let resp = await generatePDFTicket(ticketData);
      if(!resp)
        res.status(422).json({ message: "pdf error" });

      //send tickets
      const leader = Teams[i].members.find((member) => member.role === "leader");
      ticketData["TEAM_EMAIL"] = leader.email;
      let ressp = await sendEventMail(ticketData);
      if(!ressp)
        res.status(422).json({message: "Ticket error"});
    }
  
    res.status(200).json({ message: "done" });
  });
  
  module.exports = router;
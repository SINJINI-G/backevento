const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const ORG_EMAIL = process.env.SOURCE_EMAIL;
const ORG_PASSWD = process.env.SOURCE_EMAIL_APP_PASSWORD;
const eventName = process.env.EVENT_NAME;
const posterFile = "mogojastro_poster.png";
const logoFile = "sc_logo.png";
const posterFilePath = path.resolve(__dirname, posterFile);
const logoFilePath = path.resolve(__dirname, logoFile);


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ORG_EMAIL,
    pass: ORG_PASSWD,
  },
});

const sendWelcomeMail = async (leaderName, leaderEmail) => {
  let info = await transporter.sendMail({
    from: ORG_EMAIL,
    to: leaderEmail,
    subject: `Registration successful for ${eventName}!!`,

    text: `Hi ${leaderName},\n\n
    Congratulations! Your registration for ${eventName} is successful.\n\n
    Please collect your payment receipt from the registration desk at the 
    College Canteen.\n\n
    If you have any questions or concerns, please do not hesitate to contact us 
    at ${ORG_EMAIL} or +91 8436351337 / +91 9832609948 / +91 7059445497.\n\n
    Thanking You & All the Best!\n\n
    Kind Regards,\n
    Team SC_CSBS\n
    Academy of Technology`,

    html: `<b>Hi ${leaderName}</b>,<br/><br/>
    Congratulations! Your registration for <b>${eventName}</b> is successful.<br/><br/>
    Please collect your payment receipt from the registration desk at the 
    <b>College Canteen</b>.<br/><br/>
    If you have any questions or concerns, please do not hesitate to contact us at ${ORG_EMAIL} or 
    +91 8436351337 / +91 9832609948 / +91 7059445497.<br/><br/>
    Thanking You & All the Best!<br/><br/>
    Best Regards,<br/>
    Team SC_CSBS<br/>
    Academy of Technology<br/>
    <img src="cid:logo" height="100px" width="100px"/>`,

    attachments: [
      {
        filename: logoFile,
        path: logoFilePath,
        cid: "logo",
      },
      {
        filename: posterFile,
        path: posterFilePath,
        cid: "poster",
      },
    ],
  });

  console.log("info", info);
};

// TODO:
const sendEventMail = async (ticketData) => {
  // Read the PDF file from disk
  const pdfPath = path.resolve(__dirname, "..", "temp", `ticket_${ticketData.TICKET_ID}.pdf`);
  try{

    let info = await transporter.sendMail({
      from: ORG_EMAIL,
      to: ticketData.TEAM_EMAIL,
      subject: `Your ticket for ${eventName}!!`,
      // text: `Dear ${ticketData.TEAM_NAME},\n\nPlease find attached your PDF ticket for ${eventName}\n\nRegards,\nSC_CSBS`,

      // `Hi ${teamName},\n\nPlease find attached your PDF ticket for ${eventName}.\n\nBest regards,\nSC_CSBS`,

      html: `<h3>Hi ${ticketData.TEAM_NAME}👋,</h3><br/><br/>
      <h2>Toh kaisi chal rahi hai 🧠 ki kasrat 🏋??</h2> <br/> 
      
      We could 👂 your excitement loud so here is the event ticket 🎫 specially for you. 🥳 <br/> <br/>
       
      📢📢 Team leaders please communicate the following points to your team members:<br>
      <ul>
      <li>⏰ Check your alloted slot and come atleast <b>30 mins</b> before the event for qr verification.</li>
      <li>🆔 All the team members should be present with their <b>College ID cards</b> for member identification.</li> 
      <li>🧾 Team leaders must carry the <b>Payment receipt</b> and the event ticket attached in this mail.</li>
      </ul>

      <br/> So, buckle your seat belts 🚀 and get ready for <b>${eventName} 🔍 2023</b>. <br/><br/>
      
      
      If you have any questions or concerns, please do not hesitate to contact us at ${ORG_EMAIL} or </br>
      +91 8436351337 / +91 9832609948 / +91 7059445497.<br/><br/>
      All the Best!<br/><br/>
      Regards,<br/>
      Team SC_CSBS<br/>
      Academy of Technology<br/>`,

      attachments: [
        {
          filename: `${eventName}_ticket.pdf`,
          path: pdfPath,
        },
      ],
    });

    console.log("info", info);
    fs.unlinkSync(pdfPath);
    return true;
  }
  catch(e){
    console.log(e);
    return false;
  }
};

module.exports = { sendWelcomeMail, sendEventMail };

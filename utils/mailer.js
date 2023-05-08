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
    from: `${ORG_EMAIL}`,
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
const sendEventMail = async (leaderEmail, teamID) => {
  // Read the PDF file from disk
  const pdfPath = path.resolve(__dirname, "..", "temp", `ticket_${teamID}.pdf`);

  const pdfData = fs.readFileSync(pdfPath);

  let info = await transporter.sendMail({
    from: process.env.SOURCE_EMAIL,
    to: leaderEmail,
    subject: `Your ticket for ${eventName}!!`,
    text: `Dear ${leaderName},\n\nPlease find attached your PDF ticket for ${eventName}\n\nRegards,\nSC_CSBS`,

    // `Hi ${leaderName},\n\nPlease find attached your PDF ticket for ${eventName}.\n\nBest regards,\nSC_CSBS`,

    attachments: [
      {
        filename: `ticket_${teamID}.pdf`,
        content: pdfData,
      },
    ],
  });

  // console.log("info", info);
};

module.exports = { sendWelcomeMail, sendEventMail };

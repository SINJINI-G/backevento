const puppeteer = require("puppeteer");
const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");

const ticketTemplate = path.resolve(__dirname, "utils", "template.html");
const qrCodePath = path.resolve(__dirname, "utils", "team-qr-code.png");
const pdfPathPrefix = path.resolve(__dirname, "utils", "ticket_");

const generatePDFTicket = async (ticketData) => {
  try {
    const pdfPath = pdfPathPrefix + ticketData.TICKET_ID + ".pdf";
    const qrData = ticketData.TEAM_NAME;

    await generateQRCode(qrCodePath, qrData);

    // Image render bypass in puppeteer
    const qrImgData = fs.readFileSync(qrCodePath).toString("base64");
    ticketData.QR_CODE_IMAGE_PATH = `data:image/jpeg;base64,${qrImgData}`;

    // Insert data in the template
    const templateHTML = fs.readFileSync(ticketTemplate).toString();
    const ticketHTML = formatHTML(templateHTML, ticketData);

    // launch puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(ticketHTML);
    await page.pdf({
      path: pdfPath,
      width: "1200px",
      height: "523px",
      printBackground: true,
    });
    await browser.close();

    // delete qr file
    fs.unlinkSync(qrCodePath);

    console.log(`[+] Ticket generated at: ${pdfPath}`);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const formatHTML = (templateHTML, ticketData) => {
  // Add ticket details to our template
  const regex = /{{(.*?)}}/gi;
  return templateHTML.replace(regex, (match, key) => ticketData[key] || match);
};

const generateQRCode = async (qrFilePath, text) => {
  // Wait for the file to be written completely
  return new Promise((resolve, reject) => {
    qrcode.toFile(qrFilePath, text, { errorCorrectionLevel: "H" }, (err) => {
      if (err) {
        reject(err);
      } else {
        // console.log("[+] QR code saved!");
        resolve();
      }
    });
  });
};

module.exports = { generatePDFTicket };

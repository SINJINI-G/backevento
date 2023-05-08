# Event Backend
NodeJS backend for official SCCSBS events

## Built with
- NodeJs
- MongoDB
- Express
- Nodemailer
- Puppeteer
- Qrcode

## Installation
- Create the `.env` file based on `.env.example`
- Paste the MongoDB URI *( MongoDB Atlas > Database > Connect > Driver > Copy  connection string )*
e.g. `mongodb+srv://<user>:<password>@<cluster>.nteh6ar.mongodb.net/?retryWrites=true&w=majority`
- Set up Node Mailer 
    - Setup google account APP PASSWORD (https://youtu.be/klDTBiW6iiM)
    - SOURCE_EMAIL=sccsbsaot@gmail.com
    - SOURCE_EMAIL_APP_PASSWORD=YOUR_APP_PASSWORD_HERE

- Start the server
```sh
$ npm start
(> npm start

> backevento@1.0.0 start
> nodemon server.js

[+] Server is running on port 5000
[+] MongoDB is connected!
```
- Use this API URL - http://localhost:5000 to connect with the frontend

# License
<p align="center">
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br/> Read the <a href="LICENSE">LICENSE</a> for more details.
</p>
// first run the project by "npm run dev"
// then using ngrok expose the port "ngrok http <port on which server is running>"
// then hit the api "ngrok_url/call"  to trigger a call

const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/audio", express.static("audio"));

const PORT = process.env.PORT || 8080;

console.log("call2.js file executed");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_PHONE_NUMBER; // Twilio US trial number
const client = twilio(accountSid, authToken);
const ngrokUrl = process.env.NGROK_URL;

const MY_NUMBER = "+919322803356"; // Your verified IN number

app.get("/ping", (req, res) => {
  console.log("pong");
  res.send("IVR System is running.");
});
// 1️⃣ Route to trigger outbound call
app.get("/call", async (req, res) => {
  try {
    console.log("call req received");
    const call = await client.calls.create({
      to: MY_NUMBER,
      from: TWILIO_NUMBER,
      url: `${ngrokUrl}/voice`, // public server url / ngrok
    });

    res.send(`Call initiated. SID: ${call.sid}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error initiating call: " + err.message);
  }
});

// 2️⃣ Main IVR Menu: Language selection
app.post("/voice", (req, res) => {
  console.log("voice req received");
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    input: "dtmf",
    numDigits: 1,
    action: `${ngrokUrl}/language`,
    method: "POST",
  });

  //   gather.say(
  //     { voice: "alice", language: "en-US" },
  //     "Welcome! For Marathi, press 1. For Hindi, press 2."
  //   );
  gather.play(`${ngrokUrl}/audio/converted_welcome.wav`); // "Welcome! For Marathi press 1, Hindi press 2"
  twiml.redirect(`${ngrokUrl}/voice`); // repeat if no input
  res.type("text/xml");
  res.send(twiml.toString());
});

// 3️⃣ Language selection
app.post("/language", (req, res) => {
  console.log("language req received");
  const digit = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === "1") twiml.redirect(`${ngrokUrl}/marathi-menu`);
  else if (digit === "2") twiml.redirect(`${ngrokUrl}/hindi-menu`);
  else {
    twiml.say(
      { voice: "alice", language: "en-US" },
      "Invalid choice. Redirecting to main menu."
    );
    twiml.redirect(`${ngrokUrl}/voice`);
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

// 4️⃣ Marathi Submenu
app.post("/marathi-menu", (req, res) => {
  console.log("marathi-menu req received");
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    input: "dtmf",
    numDigits: 1,
    action: `${ngrokUrl}/marathi-submenu-action`,
    method: "POST",
  });

  gather.play(`${ngrokUrl}/audio/marathi/converted_marathi_submenu.wav`); // marathi submenu audio

  twiml.redirect(`${ngrokUrl}/marathi-menu`); // repeat if no input

  res.type("text/xml");
  res.send(twiml.toString());
});

// 5️⃣ Marathi Submenu Actions
app.post("/marathi-submenu-action", (req, res) => {
  console.log("marathi-submenu-action req received");
  const digit = req.body.Digits;
  const callerNumber = req.body.From; // Twilio number (caller)
  const receiverNumber = req.body.To;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === "1") {
    // Play Aadhaar info
    twiml.play(`${ngrokUrl}/audio/marathi/converted_marathi_info.wav`); // marathi submenu option 1 (information)
  } else if (digit === "2") {
    // Ask for Aadhaar number
    const gather = twiml.gather({
      input: "dtmf",
      numDigits: 12,
      action: `${ngrokUrl}/marathi-check-aadhaar`,
      method: "POST",
    });
    gather.play(`${ngrokUrl}/audio/marathi/converted_enter_aadhar_no.wav`);
  } else if (digit === "3") {
    // Option 3: Log user’s number and play audio
    console.log("receiver number:", receiverNumber);
    console.log("caller number:", callerNumber);
    twiml.play(
      `${ngrokUrl}/audio/marathi/converted_will_contact_u_marathi.wav`
    );
  } else {
    // Invalid option
    twiml.say({ language: "mr-IN" }, "अवैध पर्याय. कृपया पुन्हा प्रयत्न करा.");
    twiml.redirect(`${ngrokUrl}/marathi-menu`);
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

// 6️⃣ Marathi Aadhaar Check
app.post("/marathi-check-aadhaar", (req, res) => {
  console.log("marathi-check-aadhaar req received");
  const aadhaar = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  // Example processing
  const isSeeded = true; // placeholder

  if (isSeeded) {
    twiml.play(`${ngrokUrl}/audio/marathi/converted_seeding_successfull.wav`);
  } else {
    twiml.play(`${ngrokUrl}/audio/marathi/converted_seeding_unsuccessfull.wav`);
  }

  // twiml.say(
  //   { language: "mr-IN" },
  //   `तुमचा आधार क्रमांक ${aadhaar} अद्याप सीड केलेला नाही.`
  // );
  res.type("text/xml");
  res.send(twiml.toString());
});

// ------------------hindi menu-------------------------------------------------

// 7️⃣ Hindi submenu & actions (mirror Marathi)
app.post("/hindi-menu", (req, res) => {
  console.log("hindi-menu req received");
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    input: "dtmf",
    numDigits: 1,
    action: `${ngrokUrl}/hindi-submenu-action`,
    method: "POST",
  });

  gather.play(`${ngrokUrl}/audio/hindi/converted_hindi_submenu.wav`); // hindi submenu audio
  //   gather.say(
  //     { language: "hi-IN", voice: "alice" },
  //     "आधार लिंकिंग और सीडिंग के बारे में जानने के लिए १ दबाएँ। अपना आधार सीड किया गया है या नहीं, यह जानने के लिए २ दबाएँ।"
  //   );
  twiml.redirect(`${ngrokUrl}/hindi-menu`);
  res.type("text/xml");
  res.send(twiml.toString());
});

app.post("/hindi-submenu-action", (req, res) => {
  console.log("hindi-submenu-action req received");
  const callerNumber = req.body.From; // Twilio number (caller)
  const receiverNumber = req.body.To; // Twilio number (receiver)
  const digit = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === "1") {
    twiml.play(`${ngrokUrl}/audio/hindi/converted_hindi_info.wav`);
  } else if (digit === "2") {
    const gather = twiml.gather({
      input: "dtmf",
      numDigits: 12,
      action: `${ngrokUrl}/hindi-check-aadhaar`,
      method: "POST",
    });
    gather.play(`${ngrokUrl}/audio/hindi/converted_enter_aadhar_no.wav`);
  } else if (digit === "3") {
    console.log("User pressed 3.");
    console.log("receiver number:", receiverNumber);
    console.log("caller number:", callerNumber);
    twiml.play(`${ngrokUrl}/audio/hindi/converted_will_contact_u_hindi.wav`);
  } else {
    twiml.say(
      { language: "hi-IN", voice: "alice" },
      "अवैध विकल्प। कृपया फिर से प्रयास करें।"
    );
    twiml.redirect(`${ngrokUrl}/hindi-menu`);
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

app.post("/hindi-check-aadhaar", (req, res) => {
  console.log("hindi-check-aadhaar req received");
  const aadhaar = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();
  const isSeeded = false; // placeholder

  if (isSeeded) {
    twiml.play(`${ngrokUrl}/audio/hindi/converted_seed_succ.wav`);
  } else {
    twiml.play(`${ngrokUrl}/audio/hindi/converted_seed_unsucc.wav`);
  }
  res.type("text/xml");
  res.send(twiml.toString());
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

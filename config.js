const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/adc46970456c26cad0c15.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "HELLOW THEIR, QUEEN ANJU IS ALIVE...\n\nOWNER: JANITH RASHMIKA\n\nTHANKS FOR USING QUEEN ANJU MD",
};

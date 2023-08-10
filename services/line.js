const line = require("@line/bot-sdk");
const Client = line.Client;

export const sendMessage = ({ id, type, text }) => {
  const client = new Client({
    channelAccessToken: "YOUR_TOKEN",
    channelSecret: "YOUR_CHANNEL",
  });
  client.pushMessage(id, { type, text });
};

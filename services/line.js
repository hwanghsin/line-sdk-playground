const line = require("@line/bot-sdk");
const Client = line.Client;

const client = new Client({
  channelAccessToken: process.env.LINE_TOKEN,
  channelSecret: process.env.LINE_SECRET,
});

const sendMessage = async ({ id, type, text }) => {
  await client.pushMessage(id, { type, text });
};

const replyMessage = async ({ token, type, text }) => {
  await client.replyMessage(token, { type, text });
};

const handleEventType = async (event) => {
  console.log("event", event);
  switch (event.type) {
    case "videoPlayComplete": // 1 on 1
      break;
    case "memberLeft": // group chats
      break;
    case "memberJoined": // group chats
      break;
    case "leave": // group chats
      break;
    case "join": // group chats
      break;
    case "follow": // 1 on 1
      break;
    case "unfollow": // 1 on 1
      break;
    case "unsend":
      break;
    case "postback":
      handlePostback(event);
      break;
    default: // message
      await handleMessage(event);
  }
};

const handleMessage = async ({ replyToken, message }) => {
  switch (message.type) {
    case "location":
      await replyMessage({
        token: replyToken,
        type: "text",
        text: `
            ${message.address}, ${message.latitude}, ${message.longitude}
          `,
      });
      break;
    case "audio":
      break;
    case "video":
      break;
    case "image":
      break;
    case "sticker":
      // await replyMessage({
      //   token: replyToken,
      //   type: "text",
      //   text: `you've sent a sticker`,
      // });
      break;
    default: // text
      // echo
      await replyMessage({
        token: replyToken,
        type: "text",
        text: message.text,
      });
  }
};

const handlePostback = ({ postback }) => {
  console.log("data", postback.data);
};

module.exports = { handleEventType, sendMessage, replyMessage };

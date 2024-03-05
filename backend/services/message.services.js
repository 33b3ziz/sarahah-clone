const messageModel = require("../models/message.model");
const userModle = require("../models/user.model");
module.exports.addMessage = async (req, res) => {
  const { userId, content } = req.body;
  console.log(userId, content);
  let user = await userModle.findOne({ _id: userId });
  if (user) {
    await messageModel.insertMany({ userId, content });
    res.json({ message: "message was added successfully" });
  } else {
    res.json({ message: "user not found" });
  }
};
module.exports.getMessages = async (req, res) => {
  const userId = req.id;
  let messages = await messageModel.find({ userId }, { content: 1, _id: 0 });
  res.json({ messages });
};

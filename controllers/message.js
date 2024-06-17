const Message = require("../models/message");
const User = require("../models/user");


exports.sendMessage = async (req, res, next) => {
  const { content } = req.body;

  try {
    const msg = await req.user.createMessage({
      content
    });

    res.status(201).json({ message: "Message sent successfully!", msg });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


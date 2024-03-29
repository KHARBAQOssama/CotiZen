const User = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ message: {type:'error',content:"user not found, email is incorrect"} });

  let passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res
      .status(401)
      .json({
        message: {
          type: "error",
          content: "Password is  not Correct",
        },
      });
  }
  const payload = {
    id: user._id,
    email: user.email,
    full_name: user.full_name,
  };
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "7d",
  });
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 100,
  });
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 604800000,
  });
  return res.send({
    message: { type: "success", content: "Logged In" },
  });
};

const me = (req, res)=> {
    return res.status(200).json({ user : req.user });
}

const logout = (req, res) =>{
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    return res.status(200).json({ message:{type : "success", content: "logged out"}});
  }
module.exports = {
  login,
  me,
  logout
};

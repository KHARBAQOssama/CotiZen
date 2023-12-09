const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Action denied" });
  }

  try {
    let user;

    if (accessToken) {
      try {
        user = jwt.verify(accessToken, process.env.JWT_SECRET);
      } catch (error) {
        user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      }
    } else {
      user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    }

    const {
      id,
      email,
      full_name,
    } = user;
    const newAccessToken = jwt.sign(
      {
        id,
        email,
        full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: 900 }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    req.user = user;
    return next();
  } catch (err) {
    res.status(401).json({ message: "Invalid access or refresh tokens" });
  }
};

module.exports = authenticated;
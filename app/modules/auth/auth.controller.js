import jwt from "jsonwebtoken";

import User from "./User.model.js";

export async function signIn(req, res) {
  try {
    const userData = req.body;
    const result = await User.findOne({ email: userData?.email });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result) {
      const token = jwt.sign(
        { _id: result._id, email: result.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      res.json({
        token,
        message: "User signed in successfully",
      });
      //   res.json({ token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

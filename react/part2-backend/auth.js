import { Router } from "express";
import User from "./models/UserModel.js";
import bcrypt from "bcrypt";
const router = Router();

router.post("", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // check is user already exists
    const existsUser = await User.findOne({
      email,
    });
    if (existsUser?._id) {
      return res.status(200).json({ msg: "User already exists." });
    }
    const saltPassword = await bcrypt.hash(password, 10);
    const transaction = await User.transaction();

    const user = await User.create(
      {
        email,
        password,
        name,
      },
      {
        transaction,
      },
    );
    return res.status(200).json({ msg: "User created succesfully." });
  } catch (e) {
    return res.send(500).json(e);
  }
});

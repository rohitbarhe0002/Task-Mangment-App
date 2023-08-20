import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

type RequestType = {
  username: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: any) {
    const { username,password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    console.log(user.password,password,">>>>>>")
    const isPasswordChecked = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordChecked) {
      return res.status(404).json({ errorMessage: "password is not matched" });
    }
    const token = jwt.sign({ username }, process.env.JWT_TOKEN, { expiresIn: '5h' });

    // Set the cookie and send the response in one go
    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "10h"
    }).status(200).json({ token });
  
  } catch (err) {
    res.status(500).json(err);
  }


}
}

export default authController;


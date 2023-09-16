import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

// Create an array to store revoked tokens
const tokenBlacklist = [];

console.log(process.env.JWT_TOKEN, "code");

type RequestType = {
  username: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: any) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
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
  },

  async logout(req, res) {
    console.log("logout");
    try {
      // Retrieve the token from the request (You might need to adjust this based on your setup)
      console.log( req.cookies.access_token,">>>")
      const token = req.cookies.access_token;

      if (!token) {
        return res.status(400).json({ error: 'Token not found in the request.' });
      }
  
      // Clear the token cookie on the client-side first
      res.clearCookie("access_token");
  
      // Add the token to the blacklist when a user logs out
      tokenBlacklist.push(token);
  
      console.log("Token revoked and cleared");
      res.status(200).json("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: 'An error occurred during logout.' });
    }
  }
  
};

// Export the tokenBlacklist array so that it can be used in other parts of your application
export { tokenBlacklist };
export default authController;

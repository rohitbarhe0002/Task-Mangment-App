
import { Request, Response } from 'express';
import User from '../models/User'; 

const userController = {
  async signUp(req: Request, res: Response) {
    console.log(res,"res is here")
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while signing up.' });
    }
  },
};

export default userController;

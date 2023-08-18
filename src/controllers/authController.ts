import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type RequestType = {
  username: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: Response) {
    const { username } = req.body;

    const token = jwt.sign({ username }, process.env.JWT_TOKEN, { expiresIn: '5h' });

    res.json({ token });
  },
};

export default authController;


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header('Authorization');

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization header missing.' });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authorization token.' });
  }
};

export default authenticateUser;

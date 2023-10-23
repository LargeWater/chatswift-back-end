import jwt from 'jsonwebtoken';
import { Chat } from '../models/Chat';

const SECRET = process.env.SECRET;

const decodeUserFromToken = (req, res, next) => {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (!token) return next();

  token = token.replace('Bearer ', '');
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return next(err);

    req.user = decoded.user;
    next();
  });
};

const checkChatParticipant = (req, res, next) => {
  const { chatId } = req.params;
  const { user } = req;

  Chat.findOne({ _id: chatId, users: user._id }, (err, chat) => {
    if (err || !chat) return res.status(403).json({ err: 'Not a participant in this chat' });
    next();
  });
};

export { decodeUserFromToken, checkChatParticipant };

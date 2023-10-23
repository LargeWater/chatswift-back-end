import { Chat } from '../models/Chat';
import { User } from '../models/user';

async function createChat(user1, user2) {
  try {
    const existingUser1 = await User.findOne({ _id: user1 });
    const existingUser2 = await User.findOne({ _id: user2 });

    if (!existingUser1 || !existingUser2) {
      return { error: 'Both users must exist.' };
    }

    const newChat = new Chat({
      users: [user1, user2],
      messages: [],
    });

    const chat = await newChat.save();
    return chat;
  } catch (err) {
    console.error(err);
    return { error: 'Server error' };
  }
}

async function addMessageToChat(chatId, sender, content) {
  try {
    const chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      return { error: 'Chat not found.' };
    }

    if (!chat.users.includes(sender)) {
      return { error: 'You are not a participant in this chat.' };
    }

    chat.messages.push({
      sender,
      content,
    });

    const updatedChat = await chat.save();
    return updatedChat;
  } catch (err) {
    console.error(err);
    return { error: 'Server error' };
  }
}

export { createChat, addMessageToChat };
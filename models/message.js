import mongoose from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema({
  text: String,
  users: { type: Schema.Types.ObjectId, ref: 'User' },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
},{
  timestamps: true,
})

const Chat = mongoose.model('Chat', chatSchema)

export { Chat }
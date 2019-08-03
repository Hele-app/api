'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')
const Chat = use('App/Models/Chat')
const ChatUser = use('App/Models/ChatUser')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onOpen() {
    console.log('connected')
  }

  onClose() {
    console.log('disconnected')
  }

  async onMessage(msg) {
    console.log(msg)
    // const user = User.find(1)
    try {

      // const byChatId = 
      //   await Message
      //     .query()
      //     .wherePivot('chat_id', 1)
      //     .fetch()
      // const allMsg = await Message.all()
      // // const user = await allMsg.users().fetch()
      // console.log(byChatId.toJSON())
      // console.log(allMsg.toJSON())      
      // console.log(user)

      // const group = await ChatGroup.find(1) 
      // const message = await group.messages().fetch()
      // console.log(group.toJSON())
      // console.log(message.toJSON())

      const user = await User.find(1)
      // const chat = await user.chats().fetch()
      // const chat = await Chat.find(1)
      // const user = await chat.users().fetch()
      // const message = await chat.messages().fetch()
      const message = await user.messages().fetch()

      // console.log(user.toJSON())
      // console.log(chat.toJSON())

      console.log(user.toJSON())
      console.log(message.toJSON())

    } catch (err){
      console.error(err)
    }
  }

  onError(err) {
    console.error('error', err)
  }
}

module.exports = ChatController

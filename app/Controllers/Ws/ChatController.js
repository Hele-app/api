'use strict'

const Message = use('App/Models/Message')
const ChatUser = use('App/Models/ChatUser')
const User = use('App/Models/User')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }
  
  async onOpen() {
    console.log('connected')
  }
  
  onClose() {
    console.log('disconnected')
  }

  async onToken() {
    try {

      const user = await User.findOrFail(1)
  
      let token = await this.auth.generate(user)
      console.log(this.auth.user)

      console.log({token})
    } catch (error) {
  
      console.error('onTest error : ', error)

    }
  }

  
  async onMessage(data) {
    try {
      
      console.log('message = ' + data.msg + ' || chatID = ' + data.chatID + ' || userID = ' + data.userID)

      /**
       * WORKING BUT DIRTY
       */

      const chatUser = new ChatUser
      chatUser.user_id = data.userID
      chatUser.chat_id = data.chatID
      
      await chatUser.save()

      const message = new Message
      message.content = data.msg
      
      // const saveMsg = 
      await chatUser.messages().save(message)

      // console.log('saveMSg = ' , saveMsg)
      

      /**
       * TESTS
       */

      // const message = new Message
      // message.content = data.msg

      // const association = await message.chatUser().associate(message)
      // console.log(association)

      // const chat = await Chat.findOrFAil(1)
      // const user = await User.findOrFail(1)

      // const attach = await user.chats().attach([data.chatID])
      // const test = await user.load('messages')
      // await user.getRelated('test')
      // console.log(test)
      // console.log(user.toJSON())
      // // // const attach = await user.save()


      // console.log(attach.toJSON())
      // console.log('attach id = ' , attach.id)


      // dosen't work with manyThrough relationship
      // await user.messages().save(message)
      
      // find the user username via its name on this chat
      // const username = await chat.users().select('username').where('user_id', 3).fetch()

      // console.log(username.toJSON())
      // console.log(message.toJSON())
      // console.log(user.toJSON())

    } catch (err){
      console.error('msg error', err)
    }
  }

  onError(err) {
    console.error('error', err)
  }
}

module.exports = ChatController

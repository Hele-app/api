'use strict'

const Message = use('App/Models/Message')
const User = use('App/Models/User')
const Chat = use('App/Models/Chat')
const Database = use('Database')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(msg) {
    try {
      if (msg.length === 0 || /^\s*$/.test(msg)) { return }

      const user = await this.auth.getUser()
      const username = user.username
      const userID = user.id
      const chatID = this.socket.topic.replace('chat:', '')

      const chatUser = await Database
        .select('id')
        .from('chat_users')
        .where({
          'user_id': userID, 
          'chat_id': chatID
        })
  
      const chatUserID = chatUser[0].id
      
      const message = new Message
      message.chat_user_id = chatUserID
      message.content = msg.trim()

      await message.save()
      
      this.socket.broadcastToAll('message', {
        message: message.content,
        user: username
      })

    } catch (err){
      console.error('msg error', err)
    }
  }

  async onDelete(msgID) {
    try {
      
      const user = await this.auth.getUser()
  
      if(user.roles === "YOUNG") { return }
      
      const message = await Message.findOrFail(msgID)
      const isDeleted = await message.delete()
  
      this.socket.emit('delete', isDeleted ? 'success' : 'failed')

    } catch (error) {
      console.error(error)
      this.socket.emit('delete', 'failed')
    }
  }

  async onBan(youngToBanID) {
    try {
      
      const userConnected = await this.auth.getUser()
  
      if(userConnected.roles === "YOUNG") { return }
  
      const youngToBan = await User.findOrFail(youngToBanID)
      let actualGroupChat = await youngToBan
        .chats()
        .where('type', 'GROUP')
        .first()

      actualGroupChat = actualGroupChat.toJSON()

      await youngToBan.chats().detach(actualGroupChat.id)

      let chats = await Chat
        .query()
        .select('id')
        .where('type', 'GROUP')
        .whereNot('id', actualGroupChat.id)
        .whereHas('users', builder => {
          builder.where('roles', 'YOUNG')
        }, '<', 6)
        .fetch()

      chats = chats.toJSON()

      if (chats.length > 0) {
        let chatsID = chats.map(chat => { 
          return chat.id 
        })
  
        const randomGroupChat = chatsID[Math.floor(Math.random() * chatsID.length)]
  
        await youngToBan.chats().attach(randomGroupChat)
      
        this.socket.emit('ban', `success, transferred to chat group ${randomGroupChat}`)
      } else {
        const newChat = await Chat.create({ type: 'GROUP' })
        let allPro = await User
          .query()
          .where('roles', 'PROFESSIONAL')
          .fetch()
        
        allPro = allPro.toJSON()

        const randomPro = await allPro[Math.floor(Math.random() * allPro.length)]

        await youngToBan.chats().attach(newChat.id)
        await newChat.users().attach(randomPro.id)

        let allModo = await User
          .query()
          .where('roles', 'MODERATOR')
          .fetch()
        
        allModo = allModo.toJSON()

        let randomModo =  allModo[Math.floor(Math.random() * allModo.length)]

        await newChat.users().attach(randomModo.id)

        this.socket.emit('ban', `success, transferred to chat group ${newChat.id}`)        
      }


    } catch (error) {
      this.socket.emit('ban', 'failed')
      console.error(error)
    }
  }

  onError(err) {
    console.error('error', err)
  }
}

module.exports = ChatController

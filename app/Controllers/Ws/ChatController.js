'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

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

      const allMsg = 
        // await Message
        //   .query()
        //   .where('chat_user_id', 1)
        //   .fetch()
        await Message.all()
      // const user = await allMsg.users().fetch()
      console.log(allMsg.toJSON())      
      // console.log(user)
    } catch (err){
      console.error(err)
    }
  }

  onError(err) {
    console.error('error', err)
  }
}

module.exports = ChatController

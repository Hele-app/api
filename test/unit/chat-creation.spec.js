'use strict'

const { test, trait, before, after } = use('Test/Suite')('Chat Creation')

const User = use('App/Models/User')
const Chat = use('App/Models/Chat')
const ChatUser = use('App/Models/ChatUser')
const Message = use('App/Models/Message')
const Database = use('Database')

const AuthController = use('App/Controllers/Http/AuthController')

trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {

  await User.create({
    phone: "0648372746",
    username: "theYoung",
    password: "1234",
    birthyear: 2000,
    region: "Ile-de-France"
  })

  const pro = await User.create({
    phone: "0637879378",
    username: "thePsy",
    password: "1234",
    birthyear: 1970,
    region: "Ile-de-France"
  })

  pro.roles = "PROFESSIONAL"
  await pro.save()

  const modo = await User.create({
    phone: "067987939",
    username: "theModo",
    password: "1234",
    birthyear: 1997,
    region: "Ile-de-France"
  })

  modo.roles = "MODERATOR"
  await modo.save()
})

test('make sure the young has one private chat with a pro in it', async ({ assert, client }) => {
  const user = await User.findOrFail(1)
  
  const AC = new AuthController
  await AC.youngToPro(user)

  let userChats = await user.chats().fetch()
  userChats = userChats.toJSON()
  
  assert.lengthOf(userChats, 1)
  assert.propertyVal(userChats[0], 'id', 1)
  assert.propertyVal(userChats[0], 'type', 'PRIVATE')

  const chat = await Chat.findOrFail(1)
  let privateChat = await chat.users().fetch()
  privateChat = privateChat.toJSON()

  assert.propertyVal(privateChat[0], 'id', 1)
  assert.propertyVal(privateChat[0], 'roles', 'YOUNG')

  assert.propertyVal(privateChat[1], 'id', 2)
  assert.propertyVal(privateChat[1], 'roles', 'PROFESSIONAL')
})

test('make sure a young has a private chat and a chat group', async ({ assert }) => {
  const user = await User.findOrFail(1)

  const allPro = await Database
    .select('id')
    .from('users')
    .where('roles', 'PROFESSIONAL')

  const AC = new AuthController
  await AC.youngToYoung(user, allPro)

  let userChats = await user.chats().fetch()
  userChats = userChats.toJSON()

  assert.lengthOf(userChats, 2)
  assert.propertyVal(userChats[0], 'type', 'PRIVATE')
  assert.propertyVal(userChats[1], 'type', 'GROUP')
})

// test('make sure a new chat is created when the others are full', async ({ assert }) => {
//   const user = await User.findOrFail(1)
//   const allPro = await Database
//     .select('id')
//     .from('users')
//     .where('roles', 'PROFESSIONAL')

//   let existingGroupChats = await Chat
//     .query()
//     .where('type', 'GROUP')
//     .fetch()

//   existingGroupChats = existingGroupChats.toJSON()

//   console.log('eistingChats',existingGroupChats)
//   assert.lengthOf(existingGroupChats, 1)

//   const chat = Chat.findOrFail(1)
//   let newYoungs = await chat
//     .users()
//     .createMany([{
//       phone: "0648372794",
//       username: "theYoung2",
//       password: "1234",
//       birthyear: 2000,
//       region: "Ile-de-France"
//     },
//     {
//       phone: "0648372728",
//       username: "theYoung3",
//       password: "1234",
//       birthyear: 2000,
//       region: "Ile-de-France"
//     },
//     {
//       phone: "0648372708",
//       username: "theYoung4",
//       password: "1234",
//       birthyear: 2000,
//       region: "Ile-de-France"
//     }])

//   console.log('newYoung', newYoungs.toJSON())
//   // let test = await chat.users().fetch()
//   // console.log('test',test.toJSON())
//   //set new youngs to the chat group

//   console.log('newYoungs',newYoungs.toJSON())

//   const AC = new AuthController
//   await AC.youngToYoung(user, allPro)
 
//   //verify if a new chat has been created

//   let allGroupChats = await Chat
//     .query()
//     .where('type', 'GROUP')
//     .fetch()

//   allGroupChats = allGroupChats.toJSON()
//   console.log("allGroupChats", allGroupChats)
//   // assert.lengthOf(allGroupChats, 2)
//   // const users = existingChats.getRelated('users')
//   // console.log('users', users)
//   // chat = await chat.users().fetch()
//   // chat = chat.toJSON()
//   // assert.propertyVal(chat[0], 'roles', 'YOUNG')
//   // assert.propertyVal(chat[1], 'roles', 'PROFESSIONAL')
//   // assert.propertyVal(chat[2], 'roles', 'MODERATOR')
// })

after(async () => {
  await User.truncate()
  await Chat.truncate()
  await ChatUser.truncate()
})
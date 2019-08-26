'use strict'

const { test, trait, before, after } = use('Test/Suite')('Chat')

const User = use('App/Models/User')
const Chat = use('App/Models/Chat')
const ChatUser = use('App/Models/ChatUser')
const Message = use('App/Models/Message')


trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {

  const user = await User.create({
    phone: "0648372746",
    username: "newMoon",
    password: "1234",
    birthyear: 2000,
    region: "Ile-de-France"
  })

  const chats = await Chat.createMany([
    { type: "PRIVATE" },
    { type: "GROUP" }
  ])

  user.chats().attach([chats[0].id, chats[1].id])

  const pro = await User.create({
    phone: "0637879378",
    username: "thePsy",
    password: "1234",
    birthyear: 1970,
    region: "Ile-de-France"
  })

  pro.roles = "PROFESSIONAL"

  await pro.save()

  pro.chats().attach([chats[0].id, chats[1].id])
})

test('get all chats a young can access', async ({ client }) => {

  const user = await User.findOrFail(1)

  const response = await client
    .get('/v1/chat')
    .accept('json')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([
    { type: 'PRIVATE' },
    { type: 'GROUP' }
  ])
})

// test('get all messages & users from a chat', async ({ client }) => {

//   const user = await User.findOrFail(1)

//   await Message.createMany([
//     { content: "Hello, message 1 from user 1 in chat 1", chat_user_id: 1 },
//     { content: "Hello, message 2 from user 2 in chat 1", chat_user_id: 3 },
//   ])

//   const response = await client
//     .get('/v1/chat/1')
//     .accept('json')
//     .loginVia(user)
//     .end()

//   console.log(response._res.body)
//   response.assertStatus(200)
//   response.assertJSONSubset({
//     data: [
//       {
//         type: "PRIVATE",
//         messages: [{
//           content: "Hello, message 1 from user 1 in chat 1",
//           user: [{
//             username: "newMoon",
//             roles: "YOUNG"
//           }]
//         },
//         {
//           content: "Hello, message 2 from user 2 in chat 1",
//           user: [{
//             username: "thePsy",
//             roles: "PROFESSIONAL"
//           }]
//         }],
//         users: [{
//           username: "newMoon",
//           roles: "YOUNG",
//         },
//         {
//           username: "thePsy",
//           roles: "PROFESSIONAL",
//         }]
//       }
//     ]
//   })
// })

after(async () => {
  await User.truncate()
  await Chat.truncate()
  await ChatUser.truncate()
  await Message.truncate()
})

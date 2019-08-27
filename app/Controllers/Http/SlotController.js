'use strict'

const Slot = use('App/Models/Slot')
const User = use('App/Models/User')
const Chat = use('App/Models/Chat')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')
const moment = use('moment')


class SlotController {

    async create({request, auth, response}){

        const user =  await auth.getUser()

        const validation = await validateAll(request.all(), {
           
            start_time: 'required'
          })

          //console.log(user)
    
          if(validation.fails()){
              throw new ValidationException([{
                  start_time: "invalid start time"
              }], 400)
          }

            const startTime = request.input('start_time')

          console.log(request.input('start_time'))
          // console.log(moment(startTime, 'DD/MM/YYYY, HH:mm'))

            const time = moment(startTime, 'DD-MM-YYYY, HH:mm').format("YYYY-MM-DD HH:mm")
            console.log(time)
            
            const endTime = moment(time).add(45, 'minutes').format("YYYY-MM-DD HH:mm")
            //console.log(endTime)
            
            const createSlot = new Slot();
            createSlot.pro_id = user.id
            createSlot.start_time = time
            createSlot.end_time = endTime

            await createSlot.save()

            return response.json({
                user, createSlot
            })
    }

    async index({request, auth, response}){

      const user =  await auth.getUser()

        // console.log(user)
        
        // console.log(pro.id)
        
        // console.log(result);
        
        const chat = await Chat.query().where('type', "PRIVATE").fetch()
        
        let getPro = await chat.users().whereNot('user_id', user.id).first()
        
        // console.log(getPro.toJSON())
       
        // getPro  = getPro.toJSON()
        console.log(getPro.id)
        const pro = await User.findOrFail(getPro.id)
        console.log(pro)
        const allSlots = await pro.slots().where('pro_id', pro.id).whereNull('young_id').fetch()
        let result = allSlots.toJSON();
        // console.log(chat.toJSON())

        result = result.map(function(element) {
  
         return {
           id : element.id,
           start_time : element.start_time,
           end_time : element.end_time
         }    
          
        });
        //  console.log(slot);

      return response.json({result})

    }

    async select({request, auth, response}) {

    }
}

module.exports = SlotController

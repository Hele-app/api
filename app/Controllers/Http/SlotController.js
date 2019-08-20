'use strict'

const Slot = use('App/Models/Slot')
const User = use('App/Models/User')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')
const moment = use('moment')


class SlotController {

    async create({request, auth, response}){

        const user =  await auth.getUser()

        const validation = await validateAll(request.all(), {
           
            start_time: 'required'
          })

          console.log(user)
    
          if(validation.fails()){
              throw new ValidationException([{
                  start_time: "invalid start time"
              }], 400)
          }

            const startTime = request.input('start_time')

          //console.log(request.input('start_time'))
          // console.log(moment(startTime, 'DD/MM/YYYY, HH:mm'))

            const time = moment(startTime, 'DD-MM-YYYY, HH:mm').format("YYYY-MM-DD HH:mm")
            console.log(time)
            
            const endTime = moment(time).add(45, 'minutes').format("YYYY-MM-DD HH:mm")
            console.log(endTime)
            
            const createSlot = new Slot();
            createSlot.pro_id = user.id
            createSlot.start_time = time
            createSlot.end_time = endTime

            await createSlot.save()

            return response.json({
                user, createSlot
            })
    }

    async slot({request, auth, response}){

      const user =  await auth.getUser()

        console.log(user)

        const pro = await User.query().where('roles', 'PROFESSIONAL' ).firstOrFail()

        console.log(pro)

      return response.json({user})

    }
}

module.exports = SlotController

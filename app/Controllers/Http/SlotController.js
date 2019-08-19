'use strict'

const Slot = use('App/Models/Slot')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')
const moment = use('moment')
// pm.globals.set("timestamp", moment().format(X))


class SlotController {

    async slot({request, auth, response}){

        const user =  await auth.getUser()

        const validation = await validateAll(request.all(), {
           
            start_time: 'required'
          })

          console.log(user)
          // console.log(user.id)

        // console.log(moment())
        // console.log(moment().add(45, 'minutes'))
        // console.log(moment().format("DD-MM-YYYY, h:mm:ss a"))
        


          if(validation.fails()){
              throw new ValidationException([{
                  start_time: "invalid start time"
              }], 400)
          }

            const startTime = request.input('start_time')

        //   console.log(request.input('start_time'))
          // console.log(moment(startTime, 'DD/MM/YYYY, HH:mm'))

            const time = moment(startTime, 'DD/MM/YYYY, HH:mm').format("YYYY-MM-DD HH:mm")
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

}

module.exports = SlotController

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
            // pro_id: user.id,
            start_time: 'required'
          })

          console.log(user)

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
          console.log(moment(startTime, 'DD/MM/YYYY, h:mm'))

            const time = moment(startTime, 'DD/MM/YYYY, h:mm')

            const createSlot = new Slot();
            createSlot.start_time = time

            await createSlot.save()

            return response.json({
                user, time
            })
    }

}

module.exports = SlotController

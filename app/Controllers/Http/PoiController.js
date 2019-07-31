'use strict'

const User = use('App/Models/Poi')
const { validateAll } = use('validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')


class PoiController {
    async Create({request, poi, response}) {

        const validation = await validateAll(request.all(), {
          
            name: 'required',
            phone: 'required|regex:^0[6-7](\\d{2}){4}$',
            adress: 'required',
            code_postal: 'required|number',
            latitude: 'required',
            longitude: 'required'

          })

          if (validation.fails()) {
              throw new ValidationException(validation.message(),400)
          }

        let poi = new poi()
        poi.name = request.input(name)
        poi.adress = request.input(adress)
        poi.code_postal = request.input(code_postal)
        poi.phone = request.input(phone)
        poi.description= request.input(description)
        poi.horaire = request.input(horaire)
        poi.site = request.input(site)
        poi.latitude = request.input(latitude)
        poi.longitude = request.input(longitude)

        await User.save()

        return response.json(poi)
    }



}

module.exports = PoiController

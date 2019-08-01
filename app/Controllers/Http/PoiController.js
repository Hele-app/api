'use strict'

const Poi= use('App/Models/Poi')


class PoiController {

    async home({response}) {
        const pois = await Poi.all();
        return response.json(pois)
    }

    async create({request, response , pois}) {

        const poi= request.all();

        let posted = await Poi.create({

            name : poi.name,
            adress : poi.adress,
            code_postal : poi.code_postal,
            phone : poi.phone,
            description : poi.description,
            horaire : poi.horaire,
            site : poi.site,
            latitude : poi.latitude,
            longitude : poi.longitude,

        })

        return response.json(posted)
    }



}

module.exports = PoiController

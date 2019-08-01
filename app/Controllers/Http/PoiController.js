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


    async delete({ response, params }) {

        let poi = await Poi.find(params.id);

        await poi.delete();

        return response.redirect('/poi');
    }

    async edit ({ params, response }) {
        let poi = await Poi.find(params.id);
        return response.json(poi)
    }

    async update ({ response, request, params}) {

        let poi = await Poi.find(params.id);

        poi.name = request.all().name
        poi.adress = request.all().adress
        poi.code_postal = request.all().code_postal
        poi.phone = request.all().phone
        poi.description = request.all().description
        poi.horaire = request.all().horaire
        poi.site = request.all().site
        poi.latitude = request.all().latitude
        poi.longitude = request.all().longitude

        await poi.save();

        return response.redirect('/poi');
    }

}

module.exports = PoiController

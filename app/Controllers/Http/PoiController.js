'use strict'

const Poi= use('App/Models/Poi')
const region= use('App/Models/Region')


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
            postal : poi.postal,
            phone : poi.phone,
            description : poi.description,
            hour : poi.horaire,
            site : poi.site,
            latitude : poi.latitude,
            longitude : poi.longitude,
            region_id: poi.region_id


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
        poi.postal = request.all().postal
        poi.phone = request.all().phone
        poi.description = request.all().description
        poi.hour = request.all().hour
        poi.site = request.all().site
        poi.latitude = request.all().latitude
        poi.longitude = request.all().longitude
        poi.region_id= request.all().region_id

        await poi.save();

        return response.redirect('/poi');
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

module.exports = PoiController

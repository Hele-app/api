'use strict'

const Poi= use('App/Models/Poi')
const region= use('App/Models/Region')


class PoiController {

    async home({response}) {
        const pois = await Poi.query().with('region').fetch();
        console.log(pois.toJSON())
        return response.json(pois)
    }

    async create({request, response , pois}) {

        const poi = request.all();

        let posted = await Poi.create({

            name : poi.name,
            address : poi.address,
            zipcode : poi.zipcode,
            city : poi.city,
            phone : poi.phone,
            description : poi.description,
            hour : poi.hour,
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

        return response.json(poi);
    }

    async edit ({ params, response }) {
        let poi = await Poi.findOrFail(params.id);
        return response.json(poi)
    }

    async update ({ response, request, params}) {

        let poi = await Poi.find(params.id);

        poi.name = request.input('name')
        poi.address = request.input('address')
        poi.zipcode = request.input('zipcode')
        poi.phone = request.input('phone')
        poi.city = request.input('city')
        poi.description = request.input('description')
        poi.hour = request.input('hour')
        poi.site = request.input('site')
        poi.latitude = request.input('latitude')
        poi.longitude = request.input('longitude')
        poi.region_id= request.input('region_id')

        await poi.save();

        return response.json(poi);
    }
}

module.exports = PoiController

'use strict'

const Region = use('App/Models/Region')
const Poi = use('App/Models/Poi')
const Database = use('Database')

class RegionController {
    async all({response}) {
        const regions = await Region.all();
        return response.json(regions)
    }

    async show({response, params, request}) {
        const pois = await Poi.query().with('region')
        .where({region_id: [params.id] })
        .fetch()
        return response.json(pois)
    }

    async showid ({ params, response }) {
        let region = await Region.findOrFail(params.id);
        return response.json(region)
    }
}

module.exports = RegionController

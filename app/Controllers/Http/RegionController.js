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
        const pois = await Poi.query()
        .where({region_id: [params.id] })
        .fetch()
        return response.json(pois)
    }
}

module.exports = RegionController

'use strict'
const Region= use('App/Models/Region')
const Database = use('Database')

class RegionController {
    async home({response}) {
        const regions = await Region.all();
        return response.json(regions)
    }

    async show({response, params, request}) {    
        const query = await Database.from('pois')
        .where({region_id: [params.id] })
        console.log(response.json(query))
        return response.json(query)
    }   
}

module.exports = RegionController

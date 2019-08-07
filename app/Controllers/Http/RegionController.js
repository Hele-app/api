'use strict'
const Region= use('App/Models/Region')
const Poi= use('App/Models/Poi')
const Database = use('Database')


class RegionController {
    async show({response}) {
        const regions = await Region.all();
        return response.json(regions)
        //await regions.save();
         return response.redirect('/region');
    }

    async home({response, params, request}) {
        
        const query = await Database.from('pois')
        .where({region_id: [params.id] })
        return response.json(query)
        return response.redirect('/region/poi');
    }   
}

module.exports = RegionController

'use strict'
const Region= use('App/Models/Region')

class RegionController {
    async show({response}) {
        const regions = await Region.all();
        return response.json(regions)
        //await regions.save();

         return response.redirect('/region');
    }
    
}

module.exports = RegionController

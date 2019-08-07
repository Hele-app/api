'use strict'

/*
|--------------------------------------------------------------------------
| RegionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Regions = use('App/Models/Region')

class RegionSeeder {
  async run () {
    const data =[
      {
        name: "Auvergne-Rhône-Alpes"
      },
      {
        name: "Bourgogne-Franche-Comté"

      },
      {
        name: "Bretagne"

      },
      {
        name: "Centre-Val de Loire"

      },
      {
        name: "Corse"

      },
      {
        name: "Grand Est"

      },
      {
        name: "Guadeloupe"

      },
      {
        name: "Guyane"

      },
      {
        name: "Hauts-de-France"

      },
      {
        name: "Île-de-France"
      },
      {
        name: "Martinique"

      },
      {
        name: "Mayotte"

      },
      {
        name: "Normandie"

      },
      {
        name: "Nouvelle-Aquitaine"

      },
      {
        name: "Occitanie"

      },
      {
        name: "Pays de la Loire"

      },
      {
        name: "Provence-Alpes-Côte d'Azur"

      },
      {
            name: "Réunion"

      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

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
        name: "Auvergne-Rhône-Alpes",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Bourgogne-Franche-Comté",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""

      },
      {
        name: "Bretagne",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Centre-Val de Loire",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Corse",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Grand Est",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Guadeloupe",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Guyane",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Hauts-de-France",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Île-de-France",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Martinique",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Mayotte",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Normandie",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Nouvelle-Aquitaine",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Occitanie",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Pays de la Loire",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      },
      {
        name: "Réunion",
        lattitude: "",
        longitude: "",
        lattitudeDelta: "",
        longitudeDelta: ""
      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

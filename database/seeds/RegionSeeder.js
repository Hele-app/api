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
        lattitude: "45.1474465",
        longitude: "4.2578635",
        lattitudeDelta: "0.323159000000004",
        longitudeDelta: "2.489031"
      },
      {
        name: "Bourgogne-Franche-Comté",
        lattitude: "47.645655",
        longitude: "3.8219655",
        lattitudeDelta: "0.203237999999999",
        longitudeDelta: "0.899207000000001"

      },
      {
        name: "Bretagne",
        lattitude: "48.2522905",
        longitude: "-3.1302605",
        lattitudeDelta: "0.448419000000001",
        longitudeDelta: "0.025797"
      },
      {
        name: "Centre-Val de Loire",
        lattitude: "47.6903655",
        longitude: "1.4235195",
        lattitudeDelta: "0.673133",
        longitudeDelta: "0.013183"
      },
      {
        name: "Corse",
        lattitude: "42.078187",
        longitude: "9.22287",
        lattitudeDelta: "0.234853999999999",
        longitudeDelta: "0.140102000000001"
      },
      {
        name: "Grand Est",
        lattitude: "48.713492",
        longitude: "6.096543",
        lattitudeDelta: "0.461236",
        longitudeDelta: "2.429634"
      },
      {
        name: "Guadeloupe",
        lattitude: "16.159948",
        longitude: "-61.6271435",
        lattitudeDelta: "0.002616000000003",
        longitudeDelta: "0.039650999999999"
      },
      {
        name: "Guyane",
        lattitude: "3.355575",
        longitude: "-53.7172",
        lattitudeDelta: "1.614998",
        longitudeDelta: "0.267797999999999"
      },
      {
        name: "Hauts-de-France",
        lattitude: "49.992872",
        longitude: "2.7805755",
        lattitudeDelta: "0.070712",
        longitudeDelta: "1.357333"
      },
      {
        name: "Île-de-France",
        lattitude: "48.8379525",
        longitude: "2.0779135",
        lattitudeDelta: "0.447098999999994",
        longitudeDelta: "0.766507"
      },
      {
        name: "Martinique",
        lattitude: "14.646034",
        longitude: "-61.0093585",
        lattitudeDelta: "0.31509",
        longitudeDelta: "0.288691"
      },
      {
        name: "Mayotte",
        lattitude: "-12.711707",
        longitude: "45.0947345",
        lattitudeDelta: "0.1458",
        longitudeDelta: "0.139116999999999"
      },
      {
        name: "Normandie",
        lattitude: "49.7459365",
        longitude: "45.0947345",
        lattitudeDelta: "0.055174999999999",
        longitudeDelta: "0.59246"
      },
      {
        name: "Nouvelle-Aquitaine",
        lattitude: "44.74631",
        longitude: "-0.252997",
        lattitudeDelta: "2.852186",
        longitudeDelta: "-0.615028"
      },
      {
        name: "Occitanie",
        lattitude: "43.5326025",
        longitude: "1.7852075",
        lattitudeDelta: "0.986775000000002",
        longitudeDelta: "-1.0222945"
      },
      {
        name: "Pays de la Loire",
        lattitude: "47.7322525",
        longitude: "-1.0222945",
        lattitudeDelta: "0.823537000000002",
        longitudeDelta: "0.128515"
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        lattitude: "43.863898",
        longitude: "6.32272",
        lattitudeDelta: "0.589739999999999",
        longitudeDelta: "0.214908"
      },
      {
        name: "Réunion",
        lattitude: "-21.1147345",
        longitude: "55.5289085",
        lattitudeDelta: "0.128357000000001",
        longitudeDelta: "0.198915"
      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

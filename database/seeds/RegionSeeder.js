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
        latitude: "45.1474465",
        longitude: "4.2578635",
        latitudeDelta: "0.323159000000004",
        longitudeDelta: "2.489031"
      },
      {
        name: "Bourgogne-Franche-Comté",
        latitude: "47.645655",
        longitude: "3.8219655",
        latitudeDelta: "0.203237999999999",
        longitudeDelta: "0.899207000000001"

      },
      {
        name: "Bretagne",
        latitude: "48.2522905",
        longitude: "-3.1302605",
        latitudeDelta: "0.448419000000001",
        longitudeDelta: "0.025797"
      },
      {
        name: "Centre-Val de Loire",
        latitude: "47.6903655",
        longitude: "1.4235195",
        latitudeDelta: "0.673133",
        longitudeDelta: "0.013183"
      },
      {
        name: "Corse",
        latitude: "42.078187",
        longitude: "9.22287",
        latitudeDelta: "0.234853999999999",
        longitudeDelta: "0.140102000000001"
      },
      {
        name: "Grand Est",
        latitude: "48.713492",
        longitude: "6.096543",
        latitudeDelta: "0.461236",
        longitudeDelta: "2.429634"
      },
      {
        name: "Guadeloupe",
        latitude: "16.159948",
        longitude: "-61.6271435",
        latitudeDelta: "0.002616000000003",
        longitudeDelta: "0.039650999999999"
      },
      {
        name: "Guyane",
        latitude: "3.355575",
        longitude: "-53.7172",
        latitudeDelta: "1.614998",
        longitudeDelta: "0.267797999999999"
      },
      {
        name: "Hauts-de-France",
        latitude: "49.992872",
        longitude: "2.7805755",
        latitudeDelta: "0.070712",
        longitudeDelta: "1.357333"
      },
      {
        name: "Île-de-France",
        latitude: "48.8379525",
        longitude: "2.0779135",
        latitudeDelta: "0.447098999999994",
        longitudeDelta: "0.766507"
      },
      {
        name: "Martinique",
        latitude: "14.646034",
        longitude: "-61.0093585",
        latitudeDelta: "0.31509",
        longitudeDelta: "0.288691"
      },
      {
        name: "Mayotte",
        latitude: "-12.711707",
        longitude: "45.0947345",
        latitudeDelta: "0.1458",
        longitudeDelta: "0.139116999999999"
      },
      {
        name: "Normandie",
        latitude: "49.402837",
        longitude: "0.724564",
        latitudeDelta: "0.654788000000004",
        longitudeDelta: "0.36329"
      },
      {
        name: "Nouvelle-Aquitaine",
        latitude: "44.74631",
        longitude: "-0.252997",
        latitudeDelta: "2.852186",
        longitudeDelta: "-0.615028"
      },
      {
        name: "Occitanie",
        latitude: "43.6228175",
        longitude: "2.030058",
        latitudeDelta: "0.924360999999998",
        longitudeDelta: "1.027804"
      },
      {
        name: "Pays de la Loire",
        latitude: "47.7322525",
        longitude: "-1.0222945",
        latitudeDelta: "0.823537000000002",
        longitudeDelta: "0.128515"
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        latitude: "43.863898",
        longitude: "6.32272",
        latitudeDelta: "0.589739999999999",
        longitudeDelta: "0.214908"
      },
      {
        name: "Réunion",
        latitude: "-21.1147345",
        longitude: "55.5289085",
        latitudeDelta: "0.128357000000001",
        longitudeDelta: "0.198915"
      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

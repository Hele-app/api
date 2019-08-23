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
        id: 1,
        name: "Auvergne-Rhône-Alpes",
        latitude: "45.1916365",
        longitude: "4.2190435",
        latitudeDelta: "0.4306429923",
        longitudeDelta: "2.5075569153"
      },
      {
        id: 2,
        name: "Bourgogne-Franche-Comté",
        latitude: "47.545072",
        longitude: "4.0678181648",
        latitudeDelta: "0.0080100000",
        longitudeDelta: "1.3786239624"

      },
      {
        id: 3,
        name: "Bretagne",
        latitude: "48.2522888184",
        longitude: "-3.1302604675",
        latitudeDelta: "0.4484190047",
        longitudeDelta: "0.0257970002"
      },
      {
        id: 4,
        name: "Centre-Val de Loire",
        latitude: "47.644735",
        longitude: "1.6135805",
        latitudeDelta: "0.738306000000001",
        longitudeDelta: "0.221621"
      },
      {
        id: 5,
        name: "Corse",
        latitude: "42.1937145",
        longitude: "9.332611",
        latitudeDelta: "0.042304999999999",
        longitudeDelta: "0.148555999999999"
      },
      {
        id: 6,
        name: "Grand Est",
        latitude: "48.6778155",
        longitude: "6.1132225",
        latitudeDelta: "0.586437000000004",
        longitudeDelta: "2.578813"
      },
      {
        id: 7,
        name: "Guadeloupe",
        latitude: "16.2370375",
        longitude: "-61.524765",
        latitudeDelta: "0.194203000000002",
        longitudeDelta: "0.120677999999998"
      },
      {
        id: 8,
        name: "Guyane",
        latitude: "3.3042480946",
        longitude: "-53.4812660217",
        latitudeDelta: "1.8860479593",
        longitudeDelta: "0.7147259712"
      },
      {
        id: 9,
        name: "Hauts-de-France",
        latitude: "50.278182",
        longitude: "2.2230675",
        latitudeDelta: "-0.497070000000001",
        longitudeDelta: "0.711545"
      },
      {
        id: 10,
        name: "Île-de-France",
        latitude: "48.842859",
        longitude: "2.1150125",
        latitudeDelta: "0.414055999999995",
        longitudeDelta: "0.807841"
      },
      {
        id: 11,
        name: "Martinique",
        latitude: "14.792889",
        longitude: "-61.0234375",
        latitudeDelta: "0.041708",
        longitudeDelta: "0.312267000000006"
      },
      {
        id: 12,
        name: "Mayotte",
        latitude: "-12.715386",
        longitude: "45.093109",
        latitudeDelta: "0.137008",
        longitudeDelta: "0.089244000000001"
      },
      {
        id: 13,
        name: "Normandie",
        latitude: "49.402837",
        longitude: "0.724564",
        latitudeDelta: "0.654788000000004",
        longitudeDelta: "0.36329"
      },
      {
        id: 14,
        name: "Nouvelle-Aquitaine",
        latitude: "44.5385645",
        longitude: "-0.210337",
        latitudeDelta: "2.326099",
        longitudeDelta: "0.39016"
      },
      {
        id: 15,
        name: "Occitanie",
        latitude: "43.4657897949",
        longitude: "2.0390141010",
        latitudeDelta: "1.0640560389",
        longitudeDelta: "0.9906520247"
      },
      {
        id: 16,
        name: "Pays de la Loire",
        latitude: "47.70813",
        longitude: "-0.903561",
        latitudeDelta: "0.871029999999998",
        longitudeDelta: "-0.31147"
      },
      {
        id: 17,
        name: "Provence-Alpes-Côte d'Azur",
        latitude: "43.7902215",
        longitude: "6.232034",
        latitudeDelta: "0.602398999999998",
        longitudeDelta: "0.055148"
      },
      {
        id: 18,
        name: "Réunion",
        latitude: "-21.1202585",
        longitude: "55.546931",
        latitudeDelta: "0.081160999999998",
        longitudeDelta: "0.199078"
      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

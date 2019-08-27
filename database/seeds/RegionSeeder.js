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
        latitude: "45.6196632385",
        longitude: "4.3965625763",
        latitudeDelta: "0.1610269994",
        longitudeDelta: "0.4023970068"
      },
      {
        id: 2,
        name: "Bourgogne-Franche-Comté",
        latitude: "47.4299964905",
        longitude: "4.7077407837",
        latitudeDelta: "0.5373160243",
        longitudeDelta: "0.0917140022"

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
        latitude: "47.8415870667",
        longitude: "1.6135804653",
        latitudeDelta: "0.3446039855",
        longitudeDelta: "0.2216210067"
      },
      {
        id: 5,
        name: "Corse",
        latitude: "42.0571594238",
        longitude: "9.2971897125",
        latitudeDelta: "0.0126970001",
        longitudeDelta: "0.2362619936"
      },
      {
        id: 6,
        name: "Grand Est",
        latitude: "48.8616676331",
        longitude: "5.6731505394",
        latitudeDelta: "0.2187290043",
        longitudeDelta: "0.1024829969"
      },
      {
        id: 7,
        name: "Guadeloupe",
        latitude: "16.2370376587",
        longitude: "-61.5247650146",
        latitudeDelta: "0.1942030042",
        longitudeDelta: "0.1206780002"
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
        latitude: "50.2781829834",
        longitude: "2.2230675220",
        latitudeDelta: "0.4970700145",
        longitudeDelta: "0.7115449905"
      },
      {
        id: 10,
        name: "Île-de-France",
        latitude: "48.8619918823",
        longitude: "2.4195160866",
        latitudeDelta: "0.0260049999",
        longitudeDelta: "0.1903219968"
      },
      {
        id: 11,
        name: "Martinique",
        latitude: "14.6968536377",
        longitude: "-60.9671363831",
        latitudeDelta: "0.0810780004",
        longitudeDelta: "0.0799150020"
      },
      {
        id: 12,
        name: "Mayotte",
        latitude: "-12.8235807419",
        longitude: "45.1628303528",
        latitudeDelta: "0.0188689996",
        longitudeDelta: "0.0431820005"
      },
      {
        id: 13,
        name: "Normandie",
        latitude: "49.4028358459",
        longitude: "0.7245640159",
        latitudeDelta: "0.6547880173",
        longitudeDelta: "0.3632900119"
      },
      {
        id: 14,
        name: "Nouvelle-Aquitaine",
        latitude: "44.6293907166",
        longitude: "-0.0864780024",
        latitudeDelta: "0.3852959871",
        longitudeDelta: "0.1656540036"
      },
      {
        id: 15,
        name: "Occitanie",
        latitude: "43.5997619629",
        longitude: "2.0368914604",
        latitudeDelta: "0.2175240070",
        longitudeDelta: "0.1033729985"
      },
      {
        id: 16,
        name: "Pays de la Loire",
        latitude: "47.4516067505",
        longitude: "-0.9597924948",
        latitudeDelta: "0.2130690068",
        longitudeDelta: "0.1834229976"
      },
      {
        id: 17,
        name: "Provence-Alpes-Côte d'Azur",
        latitude: "43.7902221680",
        longitude: "6.2320342064",
        latitudeDelta: "0.6023989916",
        longitudeDelta: "0.0551480018"
      },
      {
        id: 18,
        name: "Réunion",
        latitude: "-21.1419754028",
        longitude: "55.5605049133",
        latitudeDelta: "0.0005240000",
        longitudeDelta: "0.0649499968"
      }
    ]


    let regions = await Regions.createMany(data)
  
  }
}

module.exports = RegionSeeder

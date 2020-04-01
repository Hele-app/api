'use strict'

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

class EstablishmentController {
  async create({ request, response}) {

    const establishment = await Establishment.create({
      name: request.input('name'),
      code: request.input('code'),
      region_id: request.input('region_id')
    })

    return response.status(201).json({establishment})
  }

  async read({ params, response}) {
    let results = null
    if (params.id !== undefined) {
      results = await Establishment.find(params.id)
    } else {
      // TODO: Debug, not returning anything
      results = await Establishment.all()
    }
    return response.status(200).json({results})
  }

  async update({ request, params, response}) {
    const establishment = await Establishment.find(params.id)

    if (request.input('name')) {
      establishment.name = request.input('name')
    }
    if (request.input('code')) {
      establishment.name = request.input('code')
    }
    if (request.input('region_id')) {
      establishment.name = request.input('region_id')
    }

    await establishment.save()
    return response.status(200).json({establishment})
  }

  async delete({ params, response}) {
    const establishment = await Establishment.find(params.id)
    await establishment.delete()
    return response.status(204).json({})
  }
}

module.exports = EstablishmentController

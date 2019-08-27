'use strict'

const { validate } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')
const AdviceCard = use('App/Models/AdviceCard')

class AdviceCardController {

     /***
     * @api {get} /advice-card
     * @apiVersion 1.0.0
     * @apiPermission logged
     * @apiName GetAdviceCard
     * @apiGroup Advice Card
     * @apiDescription List of all advice cards.
     * 
     * @apiSuccess (Success 200) {Object} allCards List of all advice cards.
     * @apiSuccess (Success 200) {Number} allCards.id Card unique ID.
     * @apiSuccess (Success 200) {String} allCards.content Card content.
     */
    async index({ response }) {
        const allCards = await AdviceCard.all()
        response.status(200).json(allCards)
    }

    /***
     * @api {post} /advice-card
     * @apiVersion 1.0.0
     * @apiPermission logged
     * @apiName CreateAdviceCard
     * @apiGroup Advice Card
     * @apiDescription Create an advice card
     * 
     * @apiSuccess (Success 201) {Object} newCard Created card.
     * @apiSuccess (Success 201) {Number} newCard.id Created card ID.
     * @apiSuccess (Success 201) {String} newCard.content Created card content.
     */
    async store({ request, response }) {

        const validation = await validate(request.input('content'), {
            content: 'required|string|min:5'
        })

        if (validation.fails()) {
            throw new ValidationException(validation.messages(), 400)
        }

        const newCard = new AdviceCard
        newCard.content = request.input('content')

        const isCreate = await newCard.save()

        if (isCreate) {
            response.status(201).json(newCard)
        } else {
            response.status(400).json('failed')
        }
    }
}

module.exports = AdviceCardController

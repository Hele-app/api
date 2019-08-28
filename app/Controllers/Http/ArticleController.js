'use strict'

const Helpers = use('Helpers')
const Drive = use('Drive')
const slug = use('slug')

const { validate } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

const Article = use('App/Models/Article')

class ArticleController {
     /***
     * @api {get} /article
     * @apiVersion 1.0.0
     * @apiPermission logged
     * @apiName GetArticles
     * @apiGroup Article
     * @apiDescription List of all articles.
     * 
     * @apiSuccess (Success 200) {Object[]} allArticles Array of all articles
     * @apiSuccess (Success 200) {String} allArticles.title Article title
     * @apiSuccess (Success 200) {String} allArticles.path Article path     * 
     */
    async index({ response }) {

        let allArticles = await Article.all()
        allArticles = allArticles.toJSON()

        response.status(200).json(allArticles)
    }  

     /***
     * @api {post} /article/upload
     * @apiVersion 1.0.0
     * @apiPermission professional, moderator, admin
     * @apiName PostArticle
     * @apiGroup Article
     * @apiDescription Upload an article in PDF format.
     */
    async upload({ request, response }) {

        const validation = await validate(request.input('title'), {
            title: 'required|string|min:2'
        })
        
        if (validation.fails()) {
            throw new ValidationException(validation.messages(), 400)
        }

        const titleSlug = slug(request.input('title'), '-')
        const PDF = request.file('article_pdf', {
            types: ['application'],
            extnames: ['pdf']
        })

        await PDF.move(Helpers.publicPath('upload/articles/'), {
            name: `${titleSlug}.pdf`,
            overwrite: true
        })

        if (!PDF.moved()) {
            response.status(400).json('failed')
            return
        }

        let article = new Article
        article.title = titleSlug
        article.path = `upload/articles/${titleSlug}.pdf`

        await article.save()

        response.status(201).json('success')
    }

     /***
     * @api {delete} /article/:id
     * @apiVersion 1.0.0
     * @apiPermission professional, moderator, admin
     * @apiName DeleteArticle
     * @apiGroup Article
     * @apiDescription Delete an article.
     * 
     * @apiParam {Number} id Article unique ID.
     * 
     */
    async destroy({ params: {id}, response }) {

        const article = await Article.findOrFail(id)
        const isDeleted = await article.delete()

        await Drive.delete(Helpers.publicPath(`/upload/articles/${article.title}`))

        if (isDeleted) {
            response.status(204).json('success')
        } else {
            response.status(400).json('failed')
        }
    }
}

module.exports = ArticleController

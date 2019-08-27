'use strict'

const Helpers = use('Helpers')
const Article = use('App/Models/Article')

class ArticleController {
     /***
     * @api {post} /article/upload
     * @apiVersion 1.0.0
     * @apiPermission professional, moderator, admin
     * @apiName PostArticle
     * @apiGroup Article
     * @apiDescription Upload an article in PDF format.
     */
    async upload({ request, response }) {

        const PDF = request.file('article_pdf', {
            types: ['application'],
            extnames: ['pdf']
        })

        await PDF.move(Helpers.publicPath('upload/articles/'))

        if (!PDF.moved()) {
            response.status(400).json('failed')
            return
        }

        const article = new Article
        article.title = PDF.clientName
        article.path = Helpers.publicPath(`upload/articles/${PDF.clientName}`)

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

        if (isDeleted) {
            response.status(204).json('success')
        } else {
            response.status(400).json('failed')
        }
    }
}

module.exports = ArticleController

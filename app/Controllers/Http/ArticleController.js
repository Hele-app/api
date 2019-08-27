'use strict'

const Helpers = use('Helpers')
const Drive = use('Drive')


class ArticleController {
    async upload({ request, response }) {
        const article = request.multipart.file('article_pdf', {
            types: ['pdf']
        }, 
        async file => {
            await Drive.disk('local').put
        })

        // await article.move()
        await request.multipart.process()
    }
}

module.exports = ArticleController

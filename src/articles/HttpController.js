'use strict'

import { Article } from '../commons/models'
import { fstat, rename } from 'fs'
import fs from 'fs'
import { deleteFile } from '../commons/helpers/pdfupload'

export default class ArticleController {
  static async all(req, res) {
    const articles = await Article.fetchAll()
    return res.status(200).json({ data: articles })
  }

  static async index(req, res) {
    const articles = await Article.query(qb => {
      if (req.query.q) {
        qb.where('title', 'like', `%${req.query.q}%`)
      }
    }).fetchPage({
      page: req.query.p || 1
    })

    return res.status(200).json({ data: articles.models, ...articles.pagination })
  }

  static async store(req, res) {
    if (!req.file) {
      return res.status(422).json({ errors: [
        {
          msg: "E_ARTICLE_FILE_REQUIRED",
          param: "file",
          location: "body"
        }
      ]})
    }
    if (!req || !req.body) {
      fs.unlinkSync(req.file.path)
      return res.status(422).json({ errors: [
        {
          msg: "E_ARTICLE_ARGUMENTS_WRONG",
          param: "body",
          location: "body"
        }
      ]})
    }
    if (!req.body.title) {
      fs.unlinkSync(req.file.path)
      return res.status(422).json({ errors: [
        {
          msg: "E_ARTICLE_TITLE_REQUIRED",
          param: "title",
          location: "body"
        }
      ]})
    }
    const filepath = req.file.path + '.pdf'
    rename(req.file.path, filepath, function(err) {
      if (err) console.log(err)
    })
    const article = await Article.forge({
      title: req.body.title,
      filepath
    }).save()

    return res.status(201).json({ data: article })
  }

  static async show(req, res) {
    const article = await new Article({ id: req.params.id }).fetch()

    return res.status(200).json({ data: article })
  }

  static async update(req, res) {
    const article = await new Article({ id: req.params.id }).save({ title: req.body.title})

    return res.status(200).json({ data: article })
  }

  static async destroy(req, res) {
    const article = await new Article({ id: req.params.id }).fetch()
    console.log(article)
    if (article) {
      const filepath = article.get('filepath')
      if (filepath && filepath != "") {
        console.log('toto')
        if (fs.existsSync(filepath)) {
          console.log('titi')
          fs.unlinkSync(filepath)
        }
      }
      article.destroy()

      return res.status(204).send()
    }
    return res.status(404).json({"error":"no article found"});
  }
}

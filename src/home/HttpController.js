'use strict'

export default class HomeController {
  static index(req, res, next) {
    return res.json({ title: 'Home' })
  }
}

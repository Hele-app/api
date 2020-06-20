'use strict'

export default class HomeController {
  static index(req, res, next) {
    res.json({ title: 'Home' })
  }
}

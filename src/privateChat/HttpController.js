'use strict'

import { Message } from '../commons/models'

export default class ChatController {
  static async lastMessages(req, res) {
    const messages = await Message.query({ where: { chat_id: req.params.id } })
      .orderBy('created_at', 'DESC').fetchPage({ page: req.query.p || 1 })
    return res.json({ data: messages })
  }
}

'use strict'

import { orm } from '../../../config'

const Article = orm.model('Article', {
  hasTimestamps: true,
  tableName: 'articles'
})

export default Article

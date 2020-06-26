'use strict'

import bookshelf from 'bookshelf'
import knex from '../database'

const orm = bookshelf(knex)

export default orm

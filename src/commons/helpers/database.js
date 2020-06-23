'use strict'

const PAGESIZE = 20

export const getPagination = (params) => {
  const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize
    : PAGESIZE
  let offset = params.page && params.page > 0 ? params.page : 1
  offset = (offset - 1) * pageSize
  return { offset, limit: pageSize }
}

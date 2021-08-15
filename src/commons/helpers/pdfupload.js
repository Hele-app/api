'use strict'

import multer from 'multer'
import storage from '../../../config/fileupload'

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    const error = new Error('E_FILETYPE_WRONG')
    return cb(error)
  }

  return cb(null, true)
}

function upload(req, res, next) {
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 10000000
    }
  })
  const t = upload.single('file')
  t(req, res, err => {
    if (err && err.message && err.message === 'E_FILETYPE_WRONG') {
      return res.status(422).send({
        errors:
          [
            {
              msg: 'E_FILETYPE_WRONG',
              param: 'file',
              location: 'body'
            }
          ]
      })
    }
    // handle other errors
    if (err) {
      return res.status(500).send({
        error: 'FILE_UPLOAD_ERROR',
        message: 'Something wrong ocurred when trying to upload the file'
      })
    }
    next()
  })
}

export default upload

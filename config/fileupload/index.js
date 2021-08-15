'use strict'

import multer from 'multer'

const uploadsFolder = 'public/uploads'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder)
  }
})

export default storage

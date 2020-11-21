const express = require('express');
const router = express.Router();
//const { Video } = require('../models/Video');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { EWOULDBLOCK } = require('constants');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadfiles', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(res.req.file);
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post('/thumbnail', (req, res) => {
  const url = req.body.filePath;
  try {
    let filePath = '';
    let fileDuration = '';
    let thumbFilepath = '';
  
    // video info
    ffmpeg.ffprobe(url, function (err, metadata) {
      fileDuration = metadata.format.duration;
    });
  
    // create thumbnail
    ffmpeg(url)
      .on('filenames', function (filenames) {
        thumbFilepath = 'uploads/thumbnails/' + filenames[0];
      })
      .on('end', function () {
        return res.json({
          success: true,
          fileDuration: fileDuration,
          thumbFilepath: thumbFilepath
        });
      })
      .on('error', function (err) {
        throw err;
      })
      .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filname: 'thumbnail-%b.png'
      });
  } catch (err) {
    //remove video
    // ??????????
    fs.unlinkSync(url);
    return res.json({
      success: false,
      err
    });
  }
});

module.exports = router;

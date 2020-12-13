const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');
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
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post('/uploadVideo', (req, res) => {
  //save video info
  const video = new Video(req.body);
  video.save((err, doc) => {
    if(err) return res.json({
      success: false,
      err
    });
    res.status(200).json({ success: true })
  })
});

router.post('/getVideoDetail', (req, res) => {
  Video.findOne({ '_id': req.body.videoId })
    .populate('writer')
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videoDetail });
    });
});

router.get('/getVideos', (req, res) => {
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    })
});

router.post('/thumbnail', (req, res) => {
  const url = req.body.filePath;
  try {

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
        filename: 'thumbnail-%b.png'
      });
  } catch (err) {
    // catch?????????????
    fs.unlinkSync(url);
    return res.json({
      success: false,
      err
    });
  }
});

router.post('/getSubscriptionVideos', (req, res) => {

  // need to find all of the users that i am subscribing to from subscriber collection
  Subscriber.find({ 'userFrom': req.body.userFrom }).exec((err, subscribers) => {
    if(err) return res.status(400).send(err);

    let subscribedUser = [];

    subscribers.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });

    // need to fetch all of the videos that belong to the users that i found in previous step.
    Video.find({ 
      writer: { $in: subscribedUser }
    }).populate(
      'writer'
    ).exec((err, videos) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
  });
});

module.exports = router;

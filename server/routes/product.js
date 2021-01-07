/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const multer = require('multer');
const fs = require('fs');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).array('files', 10);

router.post('/uploadImages', (req, res) => {
  //upload image
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    const filePathList = req.files.map((file, index) => file.path);
    return res.status(200).send({
      success: true,
      filePathList
    });
  });
});

router.post('/deleteImage', (req, res) => {
  try {
    //delte image
    fs.unlinkSync(req.body.image);
    return res.status(200).send({
      success: true
    });
  } catch (err) {
    return res.json({
      success: false,
      err
    });
  }
});

router.post('/uploadProduct', (req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    return res.status(200).send({
      success: true
    });
  });
});

router.post('/products', (req, res) => {
  Product.find()
    .populate('writer')
    .exec((err, productList) => {
      if(err) return res.status(400).json({
        success: false, err
      });
      return res.status(200).json({
        success: true,
        productList
      });
    });
});

module.exports = router;

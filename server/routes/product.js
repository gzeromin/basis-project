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

  let order = req.body.order ?  req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0) {
      if(key === 'price') {
        findArgs[key] = {
          //Greater than equal
          $gte: req.body.filters[key][0],
          //Less than equal
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if(term) {
    Product.find(findArgs)
      .find({$text: {
                      $search: term
                    }})
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, productList) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productList
        })
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, productList) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productList
        })
      });
  }
});

router.get('/products_by_id', (req, res) => {
  //get product info by id from mongo db.
  let type = req.query.type;
  let productId = req.query.id;

  Product.find({_id: productId})
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).json({
        success: false,
        err
      });
      return res.status(200).json({
        success: true,
        product
      });
    });
});

module.exports = router;

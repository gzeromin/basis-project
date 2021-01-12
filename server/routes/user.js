/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');

const filePath = 'uploads/user';

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const createTransport = (user, pass) => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user, 
      pass
    }
  });
};

const upload = multer({ storage: storage }).single('file');


router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      data: userInfo
    });
  });
});

router.post('/uploadImage', auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    const filePath = res.req.file.path;
    User.findOneAndUpdate(
      {_id: req.user._id},
      {$set: {
        image: filePath
      }},
      (err, userInfo) => {
        if (err) return res.status(400).json({
          success: false, err
        });
        fs.unlinkSync(userInfo.image);
        return res.status(200).json({
          success: true, image: filePath
        });
      }
    )
  });
});

router.post('/login', (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        success: false,
        message: 'There is no user'
      });
    }
    //check password
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          sucess: false,
          message: err
        });
      }
      //create token
      userInfo.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // save token. where? cookie, localStorage --> cookie here
        res.cookie('x_auth', user.token).status(200).json({
          success: true,
          data: user
        });
      });
    });
  });
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json(
    Object.assign(
      {
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true
      },
      req.user._doc
    )
  );
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

/** Member Page */
router.get('/allMembers', (req, res) => {
  User.find((err, members) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
      result: members
    });
  });
});

router.post('/updateMember', (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, (err, member) => {
    if (err) return res.json({ success: false, err });
    return User.find((err, members) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).send({
        success: true,
        result: members
      });
    });
  });
});

router.post('/sendMail', (req, res) => {
  const smtpTransport = createTransport(req.body.email, req.body.pass);
  const mailCheckKey = User.getMailCheckKey(req.body.member.email);
  const mailText = '<h1>클릭하면 가입 완료!<h1>' + 'http://' + req.get('host') + '/api/user/confirmEmail?key=' + mailCheckKey;
  const mailOpt = {
    from: req.body.email,
    to: req.body.member.email,
    subject: '[메일 인증 해줭~~] From J.Min World',
    html: mailText
  };
  User.findByIdAndUpdate(req.body.member._id, {$set: {mailCheckKey : mailCheckKey}}, {useFindAndModify: false}, (errSaveKey, resultSaveKey) => {
    if(errSaveKey) return res.json({ success: false, errSaveKey });
    smtpTransport.sendMail(mailOpt, (errSendMail, resultSendMail) => {
      smtpTransport.close();
      if (errSendMail) {
        console.log(errSendMail);
        return User.findByIdAndUpdate(
          req.body.member._id, {$unset: {mailCheckKey}}, {useFindAndModify: false},
          (errRollBack, resultRollBack) => {
            if(errRollBack) return res.json({success: false, errRollBack});
            return res.json({ success: false, errRollBack });
        });
      }
      return User.find((err, members) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
          result: members
        });
      });
    });
  });
});

router.get('/confirmEmail', (req, res) => {
  User.updateOne({mailCheckKey: req.query.key}, {$set: {mailCheck: 1}}, (err, result) => {
    if (err) return res.send('<script type="text/javascript"> alert("에러가 발생했습니다. 자세한 사항은 J.min world에 문의해주세요");</script>');
    
    if(result.n == 0) {
      return res.send('<script type="text/javascript">alert("Not verified"); window.location="/";</script>');
    }
    return res.send('<script type="text/javascript">alert("Successfully verified"); window.location="/";</script>');
  });
});

module.exports = router;

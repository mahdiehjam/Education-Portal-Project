const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const path = require('path');
const User = require('../model/user');


router.get('/', function (req, res, next) {
    
    User.find({}).then(userfind=>{
      res.json(userfind);
    }).catch(err=>{
      res.send('user does not show because ...' + err);
    })
    
  });

  router.get('/teacher', function (req, res, next) {
    
    User.find({role:'teacher'},'name').then(userfind=>{
     
       // res.json(userfind);
        res.send(userfind);
    }).catch(err=>{
      res.send('user does not show because ...' + err);
    })
    
  });

//login and register , authentication 

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role:req.body.role,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email})
        .then(user => {
            
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                role: user.role,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        role: user.role,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
});
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => { 
                             //this route is protected and just users can access this route that is valid and has correct secret key
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

//uploade file

router.post('/upload',function(req, res) {
     
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public/HomeWorks/HomeWorksStudent')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
      }
  })
  var upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

//download file


/* var download = require('download-file')
 
var url = "http://i.imgur.com/G9bDaPH.jpg"
 
var options = {
    directory: "./public/HomeWorksTeacher",
    filename: "cat.gif"
}
 
download(url, options, function(err){
    if (err) throw err
    console.log("meow")
}) */


router.get('/showimage/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./public/HomeWorks/HomeWorksStudent',file);
    console.log(fileLocation);
    res.download(fileLocation, file); 
  });


// router.post('/download', async(req, resp) => {
//     //if (req.session.user) {
//     //    let authorized = /* authorization stuff */

//         if (authorized.rows[0].job_client === req.body.user && req.body.user === req.session.user.username && secret === req.body.user) {
//             await db.query(`UPDATE milestone_files SET file_download_counter = file_download_counter + 1 WHERE filename = $1 AND file_milestone_id = $2`, [req.body.file, req.body.milestone_id]);

//             let filePath = path.resolve(`./job_files/${authorized.rows[0].job_id}/${authorized.rows[0].milestone_id}/${downloadFile.rows[0].filename}`);
//             resp.download(filePath, downloadFile.rows[0].filename, (err) => {
//                 if (err) console.log(err);
//             });
//         } else {
//             resp.send({status: 'error', statusMessage: `You're not authorized`});
//         }
//    // } else {
//    //     resp.send({status: 'error', statusMessage: `You're not logged in`});
//    // }
// });


router.get('/download', (req, res, next) => {
    try {
      const file = `public/HomeWorks/HomeWorksStudent/${req.headers.address}`;
      console.log(req.headers);
      res.download(file);
      
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;

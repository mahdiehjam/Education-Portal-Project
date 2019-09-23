const express = require('express');
const router = express.Router();
const Course = require('../model/course')
const User = require('../model/user');
const CourseUser = require('../model/course-user');

router.get('/',(req,res)=>{

    CourseUser.find({}).then(response=>{
        res.json(response);
    }).catch(err=>{
        console.log('can not show course-user bcz ..'+ err)
    })
    
})

 router.post('/create',(req,res,next)=>{

   
    const newCU = new CourseUser;
     User.findOne({name: req.body.student}).then(Student=>{
        newCU.Student = Student.id;
        
    }).catch(err => {
        res.send('Cu.User does not saved because ...' + err);
      }); 
    Course.findOne({name: req.body.course}).then(course=>{
        newCU.Course = course.id;
        
    }).catch(err => {
        res.send('Cu.Course does not saved because ...' + err);
      }); 
    
    newCU.save().then(courseSaved => {
        res.send(newCU);
      }).catch(err => {
        res.send('CU does not saved because ...' + err);
      })

      next();
      

})

module.exports = router;
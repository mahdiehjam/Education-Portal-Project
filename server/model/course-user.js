const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CUSchema = new Schema({
 
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
      
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }

 
});

module.exports = mongoose.model('CourseUser', CUSchema);
const mongoose=require('mongoose')
const User=mongoose.Schema({
  FirstName:{
     type:String,
     require:true,
  },
  LastName:{
    type:String,
    require:true,
  },
  Email:{
    type:String,
    require:true,
    unique:true
  },
  userName:{
    type:String,
    require:true,
    unique:true
  },
  password : {
    type:String,
    require:true
  }
})


const user=mongoose.model('user',User)
module.exports=user
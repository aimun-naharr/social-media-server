import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required:true
  },
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
    required:true
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  profilePicture: String,
  coverImg: String,
  livesIn: String,
  worksAt: String,
  relationship: String,
  about: String,
  followers: [],
  following: [],
  
},
{timestamps: true}
)
const userModel=mongoose.model('users', UserSchema)
export default userModel
import userModel from "../Models/userModels.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
const salt =await bcrypt.genSalt(10)
const hashedPassword= await bcrypt.hash(password, salt)

  const newUser = new userModel({ userName, firstName, lastName, password: hashedPassword });
  try {
    await newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

export const loginUser=async(req, res)=>{
 const {userName, password}=req.body
 
 try {
  const user= await userModel.findOne({userName: userName})

 if(user){
  const validity=await bcrypt.compare(password, user.password)
  validity?res.status(200).json(user): res.status(400).json("wrong password")
 }
 else{
  res.status(404).json("User doesn't exist")
 }
 } catch (error) {
  res.status(500).json({message: error.message})
 }
}
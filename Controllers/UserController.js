import userModel from "../Models/userModels.js";
import bcrypt from "bcrypt"
export const getUser=async(req, res)=>{
    const id=req.params.id
    try {
        const user = await userModel.findById(id)
        if(user){

            const {password, ...otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No user found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser=async(req,res)=>{
    const id =req.params.id
    const {currentUserId, currentUserAdminStatus, password}=req.body
    if(id===currentUserId || currentUserAdminStatus){
        try {
            if(password){
                const salt=await bcrypt.genSalt(10)
                req.body.password= await bcrypt.hash(password, salt)
            }
            const user= await userModel.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied")
    }
}

export const deleteUser=async(req, res)=>{
    const id=req.params.id
    const {currentUserId, currentUserAdminStatus}= req.body
    if(currentUserId === id || currentUserAdminStatus){
        try {
            await userModel.findByIdAndDelete(id)
            res.status(200).json("Deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied")
    }
}
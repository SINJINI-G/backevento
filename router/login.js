const express = require("express");
const router = express.Router();

const Admin = require("../models/AdminSchema");

//Admin login route
router.post("/login", async (req,res) =>{
  
    try{
      const { userName , pswd } = req.body;
  
      const admin = await Admin.findOne({
        username: userName
      })
  
      if(admin){
        const match = bcrypt.compareSync(pswd, admin.password)
        
        if(match){
            const jwttoken = await admin.makeJwtToken();
            console.log(jwttoken);
            res.cookie("token", jwttoken)
            res.status(200).json({id:admin._id , token: jwttoken, message: "logged in successfully"})
        }
        else
          res.status(422).json({message: "Wrong password"});
      }
      else
        res.status(422).json({message: "User not found"});
    }
    catch(e){
      res.status(422).json({error: e});
    }
    
});
  
module.exports = router;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
});

adminSchema.methods.makeJwtToken = async () => {
    try{
      const token = jwt.sign({username: this.username}, JWT_SECRET, {expiresIn:"7200s"});
      return token
    }
    catch(e){
      console.log(e);
    }
}

const Admin = mongoose.model("Admin", adminSchema);
  
module.exports = Admin;
    
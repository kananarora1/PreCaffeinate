const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email });
        
        if(userExists) return res.status(400).json({ message: "User with that email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        
        res.json({ message: "User created successfully" });
    } catch(error){
        res.json({message: "Not able to create user " + error});
    }

}


exports.loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        res.send({
          success: false,
          message: "user does not exist Please Register",
        });
      }
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!validPassword) {
        res.send({
          success: false,
          message: "Sorry, invalid password entered!",
        });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
        expiresIn: "1d",
      });
  
      res.send({
        success: true,
        message: "You've successfully logged in!",
        token: token,
      });
    } catch (error) {
      console.error(error);
    }
  };

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
    try{
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch(error){
      res.json({message: "User not found"});
    }
}

exports.updateUser = async (req, res) => {
    try{
      const updatedUser = await User.updateOne({_id: req.params.id}, {$set: req.body});
      res.json(updatedUser);
    } catch(error){
      res.json({message: "User not found"});
    }
}

exports.getLoggedInUser = async (req, res) => {
    try{
      const user = await User.findById(req.user.userId);
      res.json(user);
    } catch(error){
      res.json({message: "User not found"}); 
    }
}
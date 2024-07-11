const user = require('../Models/user');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
    try{
        const userExists = await user.findOne({ email: req.body.email });
        
        if(userExists) return res.status(400).json({ message: "User with that email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 
        req.body.password = hashedPassword;

        const newUser = new user(req.body);
        await newUser.save();
        
        res.json({ message: "User created successfully" });
    } catch(error){
        res.json({message: "Not able to create user " + error});
    }

}


exports.loginUser = async (req, res) => {
    const validUser = await user.findOne({ email: req.body.email });

    if(!validUser) return res.status(400).json({ message: "User not found, please register" });
    const validPassword = await bcrypt.compare(req.body.password, validUser.password);

    if(!validPassword) return res.status(400).send({ message: "Invalid password" });

    res.send({ message: "Login successful" });
}

exports.getAllUsers = async (req, res) => {
    const users = await user.find();
    return res.status(200).json(users);
};
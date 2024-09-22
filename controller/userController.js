const {User} = require('../model/userModel')
const bcrypt = require('bcrypt')

//fucntion to create user
async function handleCreateUser(req,res){
    try {

        const {emailId,password,userName} = req.body;
        if(!emailId||!userName||!password){
            return res.status(400).json({
                msg:"Bad Request"
            })
        }

        if(!isEmail(emailId)){
            return res.status(400).json({
                msg:"emailid missing or incorrect"
            })
        }
        if(!isPassword(password)){
            return res.status(400).json({
                msg: "Password must be 6-16 characters long, include at least one number and one special character"
            })
        }
        if(!isUsername(userName)){
            return res.status(400).json({
                msg:"username missing or incorrect"
            })
        }

        const existingUserName = await User.findOne({userName});
        if(existingUserName){
            return res.status(400).json({
                msg:"Username already exists"
            })
        }

        const existingEmail = await User.findOne({emailId});
        if(existingEmail){
            return res.status(400).json({
                msg:"User Already Exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        
        const result = await User.create({
            emailId:emailId,
            userName:userName,
            password:hashPassword
        })
        
        return res.status(201).json({
            msg:"User Created Succesfully"
        })
        
    } catch (error) {
       console.log(error) 
       return res.status(500).json({
        msg: "Internal Server Error"
    });
    }
}

function isEmail(email){
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email && emailFormat.test(email);
}

function isUsername(username){
    var usernameFormat = /^[a-zA-Z0-9._]+$/;
    return username && usernameFormat.test(username);
}

function isPassword(password){
    var passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   return password && passwordFormat.test(password);
}


// Login function
async function handleLogin(req, res) {
    try {
        const { emailId, userName, password } = req.body;

        // Log the incoming request body
        console.log("Request Body:", req.body);

        // Check if both emailId and userName are missing
        if (!emailId && !userName || !password) {
            console.log("Invalid request: Missing fields");
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        // Find user by emailId or userName
        const user = emailId ? await User.findOne({ emailId }) : await User.findOne({ userName });

        // Check if user exists
        if (!user) {
            console.log("Unauthorized: User not found");
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Incorrect password for user:", user.userName);
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }

        // Exclude password from the response
        const { password: userPassword, ...userWithoutPassword } = user.toObject();


        return res.status(200).json({
            user: userWithoutPassword
        });

    } catch (error) {
        console.log("Internal server error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = {
    handleCreateUser,
    handleLogin
}
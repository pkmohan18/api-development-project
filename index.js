require("dotenv").config();
const express = require("express");

//mongoose connection
const connectDB = require("./connection");

//mongoose model
const userModel = require("./user");

const app = express();

//config

app.use(express.json());

//rout:          /
//description : To get all user
//parameter: none
app.get("/", async(req,res) => {

    try{
        const user = await userModel.find();
        return res.json({ user });
    } catch(error){
        return res.status(500).json({error:error.message});
    }
});

//rout:          /user/new/:type
//description : To get all user based on type
//parameter: type

app.get("/user/type/:type", async (req,res)=> {
    try{
        const {type} = req.params;

    const user = await userModel.find({ userType: type});

    if(!user){
        return res.json({message: "No User Found"});
    }
    return res.json({user});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
    
});

//rout:          /user/:_new
//description : To get user based on id
//parameter:_id

app.get("/user/:_id", async (req, res) => {

    try{
        const {_id} = req.params;
    const user = await userModel.findById(_id);

    if(!user){
        return res.json({message: "No User Found"});
    }
    return res.json({user});}
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

//rout:          /user/new
//description : To add new user
//parameter: none
//request body: user object

app.post("/user/new", async(req,res) => {

    try{
        const {newUser} = req.body;

    await userModel.create(newUser);

    return res.json({message: "User Created"});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

//rout:          /user/update/_id
//description : To add new user
//parameter: _id
//request body: user object

app.put("/user/update/:_id", async (req,res)=>{

    try{
        const {_id} = req.params;
    const {userData} = req.body;

    const updateUser = await userModel.findByIdAndUpdate(
        _id, 
        { $set : userData },
        { new : true }
    );

    return res.json({user: updateUser});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

//rout:          /user/delete/_id
//description : To delete user
//parameter: _id
//request body: user object

app.delete("/user/delete/:_id", async (req,res)=>{

    try{
        const {_id} = req.params;

    await userModel.findByIdAndDelete(_id,);

    return res.json({message: "User Deleted!..."});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

//rout:          /user/delete/type/:userType
//description : To delete all user
//parameter: _id
//request body: user object

app.delete("/user/delete/type/:userType", async (req,res)=>{
    try{
        const {userType} = req.params;

    await userModel.findOneAndDelete({userType});

    return res.json({message: "User Deleted!..."});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

app.listen(process.env.PORT, () =>
connectDB()
.then((data) => console.log("Server is running 🚀 "))
.catch((error) => console.log(error))
);
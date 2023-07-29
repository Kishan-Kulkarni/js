require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose=require('mongoose')
const app = express();
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true ,useUnifiedTopology: true,});
app.use(bodyparser.json({limit: '1000kb'}));
app.use(bodyparser.urlencoded({ extended: true}));
const userSchema = new mongoose.Schema({
    username: {type:String, required:true, min:4, unique:true},
    password: {type:String,  min:6},
});

const postSchema=new mongoose.Schema({
    id:{type:String},
    title:{type:String},
    summary:{type:String},
    image:{type:String},
    content:{type:String}
    }, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
const Post= mongoose.model("Post", postSchema)

app.get("/", async (req, res) => {
    const b=Date.now()
    const postData=await Post.find()
    const userData=await User.find()
    const a=Date.now()
    console.log(a-b)
    res.json({status: "OK", postData: postData, userData: userData})
})
const port =process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('Server started')
})

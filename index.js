const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/shopDB",{useNewUrlParser:true,useUnifiedTopology:true});

const shopkeeperSchema = {
    name:String,
    shopname:String,
    mobileNo:String,
    password:String,

};
const userSchema = {
    fname:String,
    lname:String,
    userHandle:String,
    password:String

};

const listSchema = {
    Title:String,
    Description:String,
    Price:String,
}
const shop = mongoose.model("Shop",shopkeeperSchema);
const user = mongoose.model("User",userSchema);
const list = mongoose.model("List",listSchema); // this is the model creatioon for 

//Shopekeeper register route
app.post('/vendor/register',(req,res)=>{
    const newShop = new shop({
        name:req.body.name,
        shopname:req.body.shopname,
        mobileNo:req.body.mobileNo,
        password:req.body.password,
    })
    console.log(newShop);
    newShop.save((err)=>{
        if(!err){
            return res.status(200).json({message:"Your details have been saved sucessfully"});
        }
        else{
            return res.status(500).json({err:err.code})
        }
    })
});
//Shopkeeper login route
app.post('/vendor/signin',(req,res)=>{
    const mobile= req.body.mobileNo;
    const password = req.body.password;
   
   shop.findOne({mobileNo:mobile},(err,foundShop)=>{
       if(err){
           return res.status(403).json({message:"You are not registerd please register first"});
       }
       else{
           if(foundShop.password === password){
               return res.status(200).json({message:"LoggedIn"});
           }
           else{
               return res.status(403).json({messgae:"Worng Password. Please try again"})
           }
       }
   })

})
// User register route
app.post('/user/register',(req,res)=>{
    const newUser = new user({
        fname:req.body.fname,
        lname:req.body.lname,
        userHandle:req.body.userHandle,
        password:req.body.password,
    })
    console.log(newUser);
    newUser.save((err)=>{
        if(!err){
            console.log("Thank you for registering with our services");
            return res.status(200).json({message:"Your details have been saved sucessfully"});
        }
        else{
            return res.status(500).json({err:err.code})
        }
    })
})
//user login route
app.post('/user/login',(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;

    user.findOne({userHandle:userName},(err,foundUser)=>{
        console.log(err);
        if(err){
            console.log(err);
            return handleError(err);
        }
        else{
            if(foundUser.password === password){
                return res.status(200).json({message:"LoggedIn"});
            }
            else{
                return res.status(403).json({messgae:"Worng Password. Please try again"})
            }
        }
    })
})
const list2 ={
    'Status':'1',
    'Items':[
        {
            'Title':'something',
            'Description':'some Description',
            'Price':123
        },
        {
            'Title':'something',
            'Description':'some Description',
            'Price':123
        },
        {
            'Title':'something',
            'Description':'some Description',
            'Price':123
        },
        {
            'Title':'something',
            'Description':'some Description',
            'Price':123
        }
    ]

};
// Route to get list from database as a json.
app.get('/vendor/list',(req,res)=>{
    // list.find({},{_id:0},(err,foundItems)=>{ This method is used when we are getting data from the database
    //     return res.status(200).json(foundItems) 
    // })
    if(res.status.code === 500)
    {
        return res.json({'Ststus':'2'})
    }
    return res.json(list2); // This method uses hardcoded json in list2 variable.
})
app.listen(3000,()=>{
    console.log('Server started on 3000');
})

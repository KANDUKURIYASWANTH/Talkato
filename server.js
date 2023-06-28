require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require("cors")
const cookieParser=require('cookie-parser') 
const app=express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())


const URL=process.env.MONGODB_URL;
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to db");
})

app.use('/api',require('./routes/authRouter'))
app.use('/api',require('./routes/userRouter'))
app.use('/api',require('./routes/postRouter'))



const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
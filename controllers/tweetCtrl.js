const Tweets=require('../models/tweetModel')
const Users=require('../models/userModel')
const Comments = require('../models/commentModel')

class APIfeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1|| 9
        const skip = (page-1)*limit
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}

const tweetCtrl={
    createTweet:async(req,res)=>{
        try {
            const {content,audios}=req.body
            if(audios.length===0)
            return res.status(400).json({msg:"please add tweets"})

            const newTweet = new Tweets({
                content,audios,user:req.user._id
            })
            await newTweet.save()
            res.json({
                msg:'Create tweet',
                newTweet:{
                    ...newTweet._doc,
                    user:req.user
                }
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}
module.exports=tweetCtrl
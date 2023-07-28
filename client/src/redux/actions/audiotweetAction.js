import { GLOBALTYPES } from "./globalTypes";
import {audioUpload} from "../../utils/audioUpload"
import { getDataAPI, postDataAPI, patchDataAPI,deleteDataAPI } from "../../utils/fetchData";
import { createNotify,removeNotify } from './notifyAction'
export const TWEET_TYPES={
    CREATE_TWEET:"CREATE_TWEET",
    LOADING_TWEET:"LOADING_TWEET",
    GET_TWEETS:"GET_TWEETS",
    UPDATE_TWEET: 'UPDATE_TWEET',
    GET_TWEET:'GET_TWEET',
    DELETE_TWEET:"DELETE_TWEET"
}
export const createTweet=({content,audios,auth,socket})=>async (dispatch)=>{
    let media=[]
    try {
        dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
        if(audios.length>0) media = await audioUpload(audios)
        const res=await postDataAPI('tweets',{content,audios:media},auth.token)
        dispatch({
            type:TWEET_TYPES.CREATE_TWEET,
            payload:{...res.data.newTweet,user:auth.user}
        })
        dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
        //has to add notify
        // const msg = {
        //     id: res.data.newTweet._id,
        //     text: 'added a new tweet.',
        //     recipients: res.data.newTweet.user.followers,
        //     url: `/post/${res.data.newTweet._id}`,
        //     content, 
        //     image: "https://res.cloudinary.com/dq3ucyivu/image/upload/v1690512406/download_hj0b8d.png"
        // }

        // dispatch(createNotify({msg, auth, socket}))
    } catch (error) {
        
    }
}
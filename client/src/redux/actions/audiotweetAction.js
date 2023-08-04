import { GLOBALTYPES } from "./globalTypes";
import {audioUpload} from "../../utils/audioUpload"
import { getDataAPI, postDataAPI, patchDataAPI,deleteDataAPI } from "../../utils/fetchData";
//import { createNotify,removeNotify } from './notifyAction'
export const TWEET_TYPES={
    CREATE_TWEET:"CREATE_TWEET",
    LOADING_TWEET:"LOADING_TWEET",
    GET_TWEETS:"GET_TWEETS",
    UPDATE_TWEET: 'UPDATE_TWEET',
    GET_TWEET:'GET_TWEET',
    DELETE_TWEET:"DELETE_TWEET"
}
export const createTweet=({content,audios,auth})=>async (dispatch)=>{
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
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:error.response.data.msg}
        })
    }
}
export const getTweets=(token)=>async (dispatch)=>{
    try {
        dispatch({type:TWEET_TYPES.LOADING_TWEET,payload:true})
        const res=await getDataAPI('tweets',token)
        dispatch({
            type:TWEET_TYPES.GET_TWEETS,
            payload:{...res.data,page:2}
        })
        dispatch({type:TWEET_TYPES.LOADING_TWEET,payload:false})
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:error.response.data.msg}
        })
    }
}
export const likeTweet=({tweet,auth,socket})=>async(dispatch)=>{
    const newTweet = {...tweet,likes:[...tweet.likes,auth.user]}
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    
    try {
        await patchDataAPI(`tweets/${tweet._id}/like`,null,auth.token)
        
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:error.response.data.msg}
        })
    }
}
export const unLikeTweet=({tweet,auth,socket})=>async(dispatch)=>{
    const newTweet={...tweet,likes:tweet.likes.filter(like=>like._id!==auth.user._id)}
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    try {
        await patchDataAPI(`tweets/${tweet._id}/unlike`,null,auth.token)
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:error.response.data.msg}
        })
    }    
}
export const saveTweet=({tweet, auth})=>async(dispatch)=>{
    const newUser = {...auth.user, savedTweet: [...auth.user.savedTweet, tweet._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
    try {
        await patchDataAPI(`saveTweet/${tweet._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
    
}
export const unSaveTweet=({tweet, auth})=>async(dispatch)=>{
    const newUser = {...auth.user, savedTweet: auth.user.savedTweet.filter(item=>item!==tweet._id)}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
    try {
        await patchDataAPI(`unSaveTweet/${tweet._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const getTweet=({detailTweet,id,auth})=>async(dispatch)=>{
    if(detailTweet.every(tweet=>tweet._id!==id)){
        try {
            const res=await getDataAPI(`audiotweet/${id}`,auth.token)
            dispatch({type:TWEET_TYPES.GET_TWEET,payload:res.data.tweet})
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload:{error:error.response.data.msg}
            })
        }
    }
}
export const deleteTweet=({tweet,auth})=>async (dispatch)=>{
    dispatch({type:TWEET_TYPES.DELETE_TWEET,payload:tweet})
    try {
        await deleteDataAPI(`audiotweet/${tweet._id}`, auth.token)
    } catch (error) {
        dispatch({
            type:GLOBALTYPES.ALERT,
            payload:{error:error.response.data.msg}
        })
        
    }
}
import { GLOBALTYPES,EditData,DeleteData} from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { TWEET_TYPES } from "./audiotweetAction";
import { postDataAPI,patchDataAPI,deleteDataAPI } from "../../utils/fetchData";
import { createNotify,removeNotify } from './notifyAction'

export const createComment=({post,newComment,auth,socket})=>async(dispatch)=>{
    
    const newPost={...post,comments:[...post.comments,newComment]}
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})

    try {
        const data={...newComment,postId:post._id,postUserId:post.user._id}
        const res=await postDataAPI('comment',data,auth.token)
        const newData = {...res.data.newComment,user:auth.user}
        const newPost={...post,comments:[...post.comments,newData]}
        dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})
        socket.emit('createComment',newPost)
        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content, 
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const updateComment=({comment,post,content,auth})=>async(dispatch)=>{
    const newComments=EditData(post.comments,comment._id,{...comment,content})
    const newPost={...post,comments:newComments}

    dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})
    try {
        patchDataAPI(`comment/${comment._id}`,{content},auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }

}
export const likeComment=({comment,post,auth})=>async(dispatch)=>{
    const newComment ={...comment,likes:[...comment.likes,auth.user]}
    const newComments=EditData(post.comments,comment._id,newComment)
    const newPost={...post,comments:newComments}
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})
    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const unLikeComment=({comment,post,auth})=>async(dispatch)=>{
    const newComment ={...comment,likes:DeleteData(comment.likes, auth.user._id)}
    const newComments=EditData(post.comments,comment._id,newComment)
    const newPost={...post,comments:newComments}
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})
    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const deleteComment=({post,auth,comment,socket})=>async (dispatch)=>{
    
    const deleteArr=[...post.comments.filter(cm=>cm.reply===comment._id),comment]
    const newPost={
        ...post,
        comments:post.comments.filter(cm=>!deleteArr.find(da=>cm._id===da._id))
    }
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})
    socket.emit('deleteComment',newPost)
    try {
        deleteArr.forEach(item=>{
            deleteDataAPI(`comment/${item._id}`, auth.token)
            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket}))
        })
        
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }

}
export const createReply=({tweet,newComment,auth,socket})=>async(dispatch)=>{
    
    const newTweet={...tweet,comments:[...tweet.comments,newComment]}
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})

    try {
        const data={...newComment,tweetId:tweet._id,tweetUserId:tweet.user._id}
        const res=await postDataAPI('reply',data,auth.token)
        const newData = {...res.data.newComment,user:auth.user}
        const newTweet={...tweet,comments:[...tweet.comments,newData]}
        dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
        socket.emit('createComment',newTweet)
        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [tweet.user._id],
            url: `/audiotweet/${tweet._id}`,
            content: tweet.content, 
            image: "https://res.cloudinary.com/dq3ucyivu/image/upload/v1690512406/download_hj0b8d.png"
        }

        dispatch(createNotify({msg, auth, socket}))
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const updateReply=({comment,tweet,content,auth})=>async(dispatch)=>{
    const newComments=EditData(tweet.comments,comment._id,{...comment,content})
    const newTweet={...tweet,comments:newComments}

    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    try {
        patchDataAPI(`reply/${comment._id}`,{content},auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }

}
export const likeReply=({comment,tweet,auth})=>async(dispatch)=>{
    const newComment ={...comment,likes:[...comment.likes,auth.user]}
    const newComments=EditData(tweet.comments,comment._id,newComment)
    const newTweet={...tweet,comments:newComments}
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    try {
        await patchDataAPI(`reply/${comment._id}/like`, null, auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const unLikeReply=({comment,tweet,auth})=>async(dispatch)=>{
    const newComment ={...comment,likes:DeleteData(comment.likes, auth.user._id)}
    const newComments=EditData(tweet.comments,comment._id,newComment)
    const newTweet={...tweet,comments:newComments}
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    try {
        await patchDataAPI(`reply/${comment._id}/unlike`, null, auth.token)
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }
}
export const deleteReply=({tweet,auth,comment,socket})=>async (dispatch)=>{
    
    const deleteArr=[...tweet.comments.filter(cm=>cm.reply===comment._id),comment]
    const newTweet={
        ...tweet,
        comments:tweet.comments.filter(cm=>!deleteArr.find(da=>cm._id===da._id))
    }
    dispatch({type:TWEET_TYPES.UPDATE_TWEET,payload:newTweet})
    socket.emit('deleteComment',newTweet)
    try {
        deleteArr.forEach(item=>{
            deleteDataAPI(`reply/${item._id}`, auth.token)
            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [tweet.user._id],
                url: `/audiotweet/${tweet._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket}))
        })
        
    } catch (error) {
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:error.response.data.msg}})
    }

}
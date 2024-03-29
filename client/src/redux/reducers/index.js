import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import audioTweets from './audiotweetReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import detailTweet from './detailTweetReducer'
import discover from "./discoverReducer"
import suggestions from './suggestionsReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from "./onlineReducer"
import tweet from "./tweetReducer"

export default combineReducers({
    auth,
    alert,
    theme,
    status,
    tweet,
    modal,
    profile,
    audioTweets,
    homePosts,
    detailPost,
    detailTweet,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online
})
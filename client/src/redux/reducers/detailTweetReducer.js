import {TWEET_TYPES } from '../actions/audiotweetAction'
import { EditData } from '../actions/globalTypes'
const detailTweetReducer=(state=[],action)=>{
    switch(action.type){
        case TWEET_TYPES.GET_TWEET:
            return [...state,action.payload]
        case TWEET_TYPES.UPDATE_TWEET:
            return EditData(state,action.payload._id,action.payload)
        default:
            return state;
    }
}
export default detailTweetReducer
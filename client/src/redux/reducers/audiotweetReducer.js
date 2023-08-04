import { TWEET_TYPES } from '../actions/audiotweetAction';
import {EditData,DeleteData} from '../actions/globalTypes'

const initialState={
    loading:false,
    tweets:[],
    result:0,
    page:2
}

const tweetReducer = (state=initialState,action)=>{
    switch(action.type){
        case TWEET_TYPES.CREATE_TWEET:
            return{
                ...state,
                tweets:[action.payload,...state.tweets]
            };
        case TWEET_TYPES.GET_TWEETS:
            return {
                ...state,
                tweets:action.payload.tweets,
                result:action.payload.result,
                page:action.payload.page
            }
        case TWEET_TYPES.LOADING_TWEET:
            return{
                ...state,
                loading:action.payload
            };
        case TWEET_TYPES.UPDATE_TWEET:
            return{
                ...state,
                tweets:EditData(state.tweets,action.payload._id,action.payload),
            };
        case TWEET_TYPES.DELETE_TWEET:
            return{
                ...state,
                tweets:DeleteData(state.tweets,action.payload._id)
            };
        default:
            return state;
    }
}

export default tweetReducer
import { TWEET_TYPES } from '../actions/audiotweetAction';
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
        default:
            return state;
    }
}

export default tweetReducer
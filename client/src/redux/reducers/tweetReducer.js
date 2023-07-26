import {GLOBALTYPES} from '../actions/globalTypes'

const tweetReducer = (state=false,action)=>{
    switch(action.type){
        case GLOBALTYPES.TWEET:
            return action.payload;
        default:
            return state;
    }
}

export default tweetReducer
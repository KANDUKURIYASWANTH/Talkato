import React from 'react'
import Status from '../components/audiotweet/status'
import Tweets from '../components/audiotweet/tweets'
import RightSideBar from '../components/home/RightSideBar'
import {useSelector} from "react-redux"
import LoadIcon from '../images/loading.gif'

const Audiotweet = () => {
  const {audioTweets}=useSelector(state=>state)
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {
          audioTweets.loading
          ?<img src={LoadIcon} alt="loading" className="d-block mx-auto"/>
          :(audioTweets.result===0 && audioTweets.tweets.length === 0 )
            ?<h2 className="text-center">No tweets</h2>
            :<Tweets/>
        }
        
      </div>
      <div className="col-md-4">
        <RightSideBar/>
      </div>
        
        
    </div>
  )
}

export default Audiotweet
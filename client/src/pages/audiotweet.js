import React from 'react'
import Status from '../components/audiotweet/status'
import Tweets from '../components/audiotweet/tweets'
import RightSideBar from '../components/home/RightSideBar'

const Audiotweet = () => {
  
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {/* {
          homePosts.loading
          ?<img src={LoadIcon} alt="loading" className="d-block mx-auto"/>
          :(homePosts.result===0 && homePosts.posts.length === 0 )
            ?<h2 className="text-center">No posts</h2>
            :<Posts />
        } */}
        <Tweets/>
      </div>
      <div className="col-md-4">
        <RightSideBar/>
      </div>
        
        
    </div>
  )
}

export default Audiotweet
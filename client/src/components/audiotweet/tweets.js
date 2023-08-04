import React from 'react'
import { useSelector } from 'react-redux'
import TweetCard from '../TweetCard'
const Tweets = () => {
  const {audioTweets,theme} = useSelector(state=>state)
  return (
    <div className='tweets'>
    {  audioTweets.tweets.map(tweet=>(
        <TweetCard key={tweet._id} tweet={tweet} theme={theme}/>
      ))}
      
    </div>
  )
}

export default Tweets
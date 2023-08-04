import React from 'react'
import TweetHeader from './audiotweet/tweet_card/TweetHeader'
import TweetBody from './audiotweet/tweet_card/TweetBody'
import TweetFooter from './audiotweet/tweet_card/TweetFoot.js'

import InputReply from './audiotweet/InputReplies'
import Replys from './audiotweet/Replys'
const TweetCard = ({tweet,theme}) => {
  return (
    <div className='card my-3'>
        <TweetHeader tweet={tweet}/>
        <TweetBody tweet={tweet} theme={theme}/>
        <TweetFooter tweet={tweet}/>
        <Replys tweet={tweet}/>
        <InputReply tweet={tweet}/>
    </div>
  )
}

export default TweetCard
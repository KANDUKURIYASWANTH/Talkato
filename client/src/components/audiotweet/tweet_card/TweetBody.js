import React,{useState} from 'react'
import TweetCarousel from '../../tweetCarousal'
const TweetBody = ({tweet,theme}) => {
    const [readMore,setReadMore]=useState(false)
  return (
    <div className='card_body'>
      <div className='card_body-content'
      style={{
        filter:theme?'invert(1)':"invert(0)",
        color:theme?'white':'#000',
      }}>
        <span>
          {
            tweet.content.length<60 
            ? tweet.content
            : readMore ? tweet.content+' ' : tweet.content.slice(0, 60) + '...'
          }
          </span>
          {
              tweet.content.length > 60 &&
              <span className="readMore" onClick={() => setReadMore(!readMore)}>
                  {readMore ? 'Hide content' : 'Read more'}
              </span>
          }
      </div>
      {
        tweet.audios.length>0 && <TweetCarousel audios={tweet.audios} id={tweet._id} />
      }
      
    </div>
  )
}

export default TweetBody
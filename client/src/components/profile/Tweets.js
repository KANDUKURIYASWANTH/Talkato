import React,{useState,useEffect} from 'react'
import TweetHeader from '../audiotweet/tweet_card/TweetHeader'
import TweetBody from '../audiotweet/tweet_card/TweetBody'
import TweetFooter from '../audiotweet/tweet_card/TweetFoot'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import {getDataAPI} from '../../utils/fetchData'
import {PROFILE_TYPES} from '../../redux/actions/profileAction'
const Tweets = ({auth,dispatch,profile,id,theme}) => {
  const [tweets,setTweets] = useState([])
  const [result,setResult]=useState(3)
  const [page,setPage] = useState(0)
  const [load,setLoad] = useState(false)
  const handleLoadMore = async ()=>{
    setLoad(true)
    const res=await getDataAPI(`user_tweets/${id}?limit=${page*9}`,auth.token)
    const newData={...res.data,page:page+1,_id:id}
    dispatch({type:PROFILE_TYPES.UPDATE_POST,payload:newData})
    setLoad(false)
  }
  useEffect(()=>{
    profile.tweets.forEach(data=>{
      if(data._id===id){
        setTweets(data.tweets)
        setResult(data.result)
        setPage(data.page)
      }
    })
  },[profile,id])
  return (
    <div className='tweets'>
      {
        tweets.length===0 && <h2 className='text-center text-danger'>No Tweets</h2>
      }
      {tweets.map(tweet=>(
        <div className='card my-3' key={tweet._id}>
          <TweetHeader tweet={tweet}/>
          <TweetBody tweet={tweet} theme={theme}/>
          <TweetFooter tweet={tweet}/>
        </div>
      ))}
      {
        load && <img src={LoadIcon} alt='loading' className='d-block mx-auto'/>
      }
      
      <LoadMoreBtn result={result}  page={page}
      load={load} handleLoadMore={handleLoadMore}/>
    </div>
  )
}

export default Tweets
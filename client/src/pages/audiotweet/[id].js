import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getTweet } from '../../redux/actions/audiotweetAction'
import LoadIcom from '../../images/loading.gif'
import TweetCard from '../../components/TweetCard'
const Post = () => {
    const {id} = useParams()
    const [tweet,setTweet] = useState([])
    const {auth,detailTweet,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTweet({detailTweet,id,auth}))
        if(detailTweet.length>0){
            const newArr = detailTweet.filter(post=>post._id===id)
            setTweet(newArr)
        }
    },[dispatch,auth,id,detailTweet])
  return (
    <div className='posts'>
        {
            tweet.length===0 
            ?<img src={LoadIcom} alt="loading" className='d-block mx-auto my-4'/>
            :<TweetCard key={tweet[0]._id} tweet={tweet[0]} theme={theme}/>
        }
    </div>
  )
}

export default Post
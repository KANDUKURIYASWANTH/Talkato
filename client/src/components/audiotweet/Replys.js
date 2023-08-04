import React,{useState,useEffect} from 'react'
import ReplyDisplay from './replys/ReplyDisplay'

const Replys = ({tweet}) => {
  const [comments,setComments]=useState([])
  const [showComments,setShowComments]=useState([])
  const [next,setNext]=useState(2)
  const [replyComments,setReplyComments] = useState([])
  useEffect(()=>{
    const newCm = tweet.comments.filter(cm=>!cm.reply)
    setComments(newCm)
    setShowComments(newCm.slice(newCm.length - next))
  },[ tweet.comments,next])
  useEffect(()=>{
    const newRep=tweet.comments.filter(cm=>cm.reply)
    setReplyComments(newRep)
  },[tweet.comments])
  return (
    <div className='comments'>
      {
        showComments.map((comment,index)=>(
          <ReplyDisplay key={index}
          comment={comment}
          tweet={tweet}
          replyCm={replyComments.filter(item=>item.reply===comment._id)}/>
        ))
      }
      {
        comments.length - next > 0 
        ?<div className='p-2 border-top'
        style={{cursor:'pointer',color:'crimson'}}
        onClick={()=>setNext(next+10)}>
          See more comments...
        </div>
        :
        comments.length>2 && <div className='p-2 border-top'
        style={{cursor:'pointer',color:'crimson'}}
        onClick={()=>setNext(2)}>
          Hide comments...
        </div>
      }
    </div>
  )
}

export default Replys
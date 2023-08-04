import React,{useState,useEffect} from 'react'
import ReplyCard from './ReplyCard'

const ReplyDisplay = ({comment,tweet,replyCm}) => {
  const [showRep,setShowRep]=useState([])
  const [next,setNext] = useState(1)
  useEffect(()=>{
    setShowRep(replyCm.slice(replyCm.length-next))
  },[replyCm,next])
   
  return (
    <div className='comment_display'>
        <ReplyCard
        comment={comment}
        tweet={tweet}
        commentId={comment._id}>
          <div className='pl-4'>
            {
              showRep.map((item,index)=>(
              item.reply&&
              <ReplyCard
              key={index}
              comment={item}
              tweet={tweet}
              commentId={comment._id}
              />

              ))
            }
            {
              replyCm.length - next > 0 
              ?<div className='p-2 border-top'
              style={{cursor:'pointer',color:'crimson'}}
              onClick={()=>setNext(next+10)}>
                See more comments...
              </div>
              :
              replyCm.length>1 && 
              <div style={{cursor:'pointer',color:'crimson'}}
              onClick={()=>setNext(1)}>
                Hide comments...
              </div>
            }
          </div>
        </ReplyCard>
    </div>
  )
}

export default ReplyDisplay
import React, {useState,useEffect} from 'react'
import Avatar from '../../Avatar'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import ReplyMenu from './ReplyMenu'
import { useSelector,useDispatch } from 'react-redux'
import {updateReply,likeReply,unLikeReply} from '../../../redux/actions/commentAction'
import InputReply from '../InputReplies'

const ReplyCard = ({children,comment,tweet,commentId}) => {
    const {auth,theme}=useSelector(state=>state)
    const dispatch=useDispatch()
    const [content,setContent]=useState('')
    const [readMore,setReadMore]=useState(false)
    const [isLike,setIsLike]=useState(false)
    const [onEdit,setOnEdit]=useState(false)
    const [loadLike,setLoadLike] = useState(false)
    const [onReply,setOnReply] = useState(false)
    useEffect(()=>{
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like=>like._id===auth.user._id)){
            setIsLike(true)
        }
    },[comment,auth.user._id])
    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeReply({comment, tweet, auth}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;
        setIsLike(false)
        
        setLoadLike(true)
        await dispatch(unLikeReply({comment, tweet, auth}))
        setLoadLike(false)
    }
    const handleUpdate=()=>{
        if(comment.content!==content){
            dispatch(updateReply({comment,tweet,content,auth}))
            setOnEdit(false)
        }
        else{
            setOnEdit(false)
        }
    }
    const handleReply=()=>{
        if(onReply) return setOnReply(false);
        setOnReply({...comment,commentId})
    }
    const styleCard={
        opacity:comment._id?1:0.5,
        PointerEvent:comment._id?'inherit':'none'
    }
  return (
    <div className='comment_card mt-3' style={styleCard}>
        <a href={`/profile/${comment.user._id}`} className='d-flex text-dark'>
            <Avatar src={comment.user.avatar} size="small-avatar"/>
            <h6 className='mx-1'>{comment.user.username}</h6>
        </a>
        <div className='comment_content'>
            <div className='flex-fill'
            style={{
                filter:theme?'invert(1)':"invert(0)",
                color:theme?'white':'#000',
              }}>
                {
                    onEdit
                    ?<textarea rows={5} value={content} 
                    onChange={e=>setContent(e.target.value)}/>
                    :<div>
                        {
                            comment.tag && comment.tag._id !== comment.user._id &&
                            <a href={`/profile/${comment.tag._id}` } className="mr-1">
                                @{comment.tag.username } 
                            </a>
                        }
                        <span>
                            {
                                content.length <100 ? content :
                                readMore ? content + ' ' : content.slice(0,100) + '....'
                            }
                        </span>
                        {
                            content.length > 100 && 
                            <span className='readMore' onClick={()=>setReadMore(!readMore)}>
                                {readMore?'Hide Content':'Read More'}
                            </span>
                        }
                    </div>
                }
                
                <div style={{cursor:'pointer'}}>
                    <small className='text-muted mr-3'>
                        {moment(comment.createdAt).fromNow()}
                    </small>
                    <small className='font-weight-bold mr-3'>
                        {comment.likes.length} likes
                    </small>
                    {
                        onEdit
                        ?
                        <>
                            <small className='font-weight-bold mr-3'
                            onClick={handleUpdate}>
                                update
                            </small>
                            <small className='font-weight-bold mr-3'
                            onClick={()=>setOnEdit(false)}>
                                cancel
                            </small>
                        </>
                        :<small className='font-weight-bold mr-3'
                        onClick={handleReply}>
                            {onReply?"cancel":"reply"}
                        </small>
                    }
                    
                </div>
            </div>
            <div className='d-flex align-items-center mx-2' style={{cursor:'pointer'}}>
                <ReplyMenu tweet={tweet} comment={comment} setOnEdit={setOnEdit}/>
                <LikeButton 
                isLike={isLike}
                handleLike={handleLike}
                handleUnLike={handleUnLike}/>
            </div>
        </div>
        {
            onReply && 
            <InputReply tweet={tweet} onReply={onReply} setOnReply={setOnReply}>
                <a href={`/profile/${onReply.user._id}`} className='mr-1'>
                    @{onReply.user.username}:
                </a>
            </InputReply>
        }
        {children}
    </div>
  )
}

export default ReplyCard
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteReply } from '../../../redux/actions/commentAction'
const ReplyMenu = ({tweet,comment,setOnEdit}) => {
    const {auth,socket} = useSelector(state=>state)
    const dispatch = useDispatch()
    const handleRemove=()=>{
        if(tweet.user._id===auth.user._id || comment.user._id === auth.user._id) dispatch(deleteReply({tweet,auth,comment,socket}))
    }
    const MenuItem=()=>{
        return (
            <>
                <div className='dropdown-item' onClick={()=>setOnEdit(true)}>
                    <span className='material-icons'>create</span> Edit
                </div>
                <div className='dropdown-item' onClick={handleRemove}>
                    <span className='material-icons'>delete_outline</span> Remove
                </div>
            </>
        )
    }
  return (
    <div>
        {
            (tweet.user._id === auth.user._id || comment.user._id === auth.user._id) &&
            <div className='nav-item dropdown'>
                <span className='material-icons' id="moreLink" data-toggle="dropdown">
                    more_vert
                </span>
                <div className='dropdown-menu' aria-labelledby='moreLink'>
                    {
                        tweet.user._id===auth.user._id
                        ? comment.user._id === auth.user._id
                            ? MenuItem()
                            : <div className='dropdown-item' >
                                <span className='material-icons'>delete_outline</span> Remove
                              </div>
                        : comment.user._id === auth.user._id && MenuItem()
                    }

                </div>
            </div>
        }
    </div>
  )
}

export default ReplyMenu
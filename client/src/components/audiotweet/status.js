import React from 'react'
import Avatar from '../Avatar'
import { useSelector,useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
const Status = () => {
    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
  return (
    <div className='status my-3 d-flex'>
        <Avatar src={auth.user.avatar} size="big-avatar"/>
        <button className='statusBtn flex-fill'
        onClick={()=>dispatch({type:GLOBALTYPES.TWEET,payload:true})}>
            Hey {auth.user.username}! what are you thinking? Come, share your thoughts! 
        </button>
    </div>
  )
}

export default Status
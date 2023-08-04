import React from 'react'
import Avatar from '../../Avatar'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import { deleteTweet } from '../../../redux/actions/audiotweetAction'
import { BASE_URL } from '../../../utils/config'
const TweetHeader = ({tweet}) => {
  const {auth} = useSelector(state=>state)
    const dispatch=useDispatch()
    const history = useHistory()
    const handleCopyLink = () => {
      navigator.clipboard.writeText(`${BASE_URL}/audiotweet/${tweet._id}`);
    };
    const handleDeleteTweet = () => {
      if (window.confirm("Are you sure want to delete this tweet?")) {
        dispatch(deleteTweet({ tweet, auth }));
        return history.push("/");
      }
    };
  return (
    <div className='card_header'>
        <div className='d-flex'>
            <Avatar src={tweet.user.avatar} size="big-avatar"/>
            <div className='card_name'>
                <h6 className='m-0'>
                    <a href={`/profile/${tweet.user._id}`} className="text-dark mx-2">
                        {tweet.user.username}
                    </a>
                </h6>
                <small className='text-muted mx-2'>
                    {moment(tweet.createdAt).fromNow()}
                </small>
            </div>
        </div>
        <div className='nav-item-dropdown'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
                more_horiz
            </span>
            <div className="dropdown-menu">
                {
                    auth.user._id === tweet.user._id && 
                    <>
                        <div className='dropdown-item' onClick={handleDeleteTweet}>
                            <span className="material-icons">delete_outline</span> Delete
                        </div>
                    </>
                }
                <div className='dropdown-item' onClick={handleCopyLink}>
                    <span className="material-icons">content_copy</span> Copy Link
                </div>
            </div>
        </div>
    </div>
  )
}

export default TweetHeader
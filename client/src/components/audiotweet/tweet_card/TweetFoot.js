import React, { useState, useEffect } from 'react'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likeTweet, unLikeTweet, saveTweet, unSaveTweet } from '../../../redux/actions/audiotweetAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'
import { Link } from 'react-router-dom'


const TweetFooter = ({tweet}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const { auth, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if(tweet.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [tweet.likes, auth.user._id])

    const handleLike = async () => {
        if(loadLike) return;
        setLoadLike(true)
        await dispatch(likeTweet({tweet, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;

        setLoadLike(true)
        await dispatch(unLikeTweet({tweet, auth, socket}))
        setLoadLike(false)
    }


    // Saved
    useEffect(() => {
        if(auth.user.savedTweet.find(id => id === tweet._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user.savedTweet, tweet._id])

    const handleSavePost = async () => {
        if(saveLoad) return;
        setSaved(true)
        setSaveLoad(true)
        await dispatch(saveTweet({tweet, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;
        setSaved(false)
        setSaveLoad(true)
        await dispatch(unSaveTweet({tweet, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                    />

                    <Link to={`/audiotweet/${tweet._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
                </div>

                {
                    saved 
                    ?  <i className="fas fa-bookmark text-info"
                    onClick={handleUnSavePost} />

                    :  <i className="far fa-bookmark"
                    onClick={handleSavePost} />
                }
               
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {tweet.likes.length} likes
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {tweet.comments.length} comments
                </h6>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/audiotweet/${tweet._id}`} theme={theme} />
            }
        </div>
    )
}

export default TweetFooter
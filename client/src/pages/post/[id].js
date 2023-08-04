import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import LoadIcom from '../../images/loading.gif'
import PostCard from '../../components/PostCard'
const Post = () => {
    const {id} = useParams()
    const [post,setPost] = useState([])
    const {auth,detailPost,theme} = useSelector(state=>state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPost({detailPost,id,auth}))
        if(detailPost.length>0){
            const newArr = detailPost.filter(post=>post._id===id)
            setPost(newArr)
        }
    },[dispatch,auth,id,detailPost])
  return (
    <div className='posts'>
        {
            post.length===0 
            ?<img src={LoadIcom} alt="loading" className='d-block mx-auto my-4'/>
            :<PostCard key={post[0]._id} post={post[0]} theme={theme}/>
        }
        
    </div>
  )
}

export default Post
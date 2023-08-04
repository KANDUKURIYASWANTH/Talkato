import React,{useEffect,useState} from 'react'
import Info from '../../components/profile/info'
import Posts from '../../components/profile/posts'
import Saved from '../../components/profile/Saved'
import Tweets from '../../components/profile/Tweets'
import {useDispatch,useSelector} from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [tab,setTab] = useState(1)
  const {auth,profile,theme}=useSelector(state=>state);
  useEffect(()=>{
    if(profile.ids.every(item=>item!==id)){
      dispatch(getProfileUsers({id,auth}))
    }
  },[id,profile,auth,dispatch])
  return (
    <div className='profile'>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {
        auth.user._id === id && 
        <div className='profile_tab'>
          <button className={tab===1?'active':''} onClick={()=>setTab(1)}>Posts</button>
          <button className={tab===2?'active':''} onClick={()=>setTab(2)}>Tweets</button>
          <button className={tab===3?'active':''} onClick={()=>setTab(3)}>Saved</button>
        </div>
      }
      {
        profile.loading
        ? <img className="d-block mx-auto my-4" src={LoadIcon} alt='loading'/>
        : <>
            {tab===3 && <Saved auth={auth} dispatch={dispatch} />}
            {tab===2 && <Tweets auth={auth} profile={profile} dispatch={dispatch} id={id} theme={theme}/>}
            {tab===1 && <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />}
        </>
      }
      
    </div>
  )
}

export default Profile
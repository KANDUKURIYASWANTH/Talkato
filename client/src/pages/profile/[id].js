import React,{useEffect,useState} from 'react'
import Info from '../../components/profile/info'
import Posts from '../../components/profile/posts'
import Saved from '../../components/profile/Saved'
import {useDispatch,useSelector} from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [saveTab,setSaveTab] = useState(false)
  const {auth,profile}=useSelector(state=>state);
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
          <button className={saveTab?'':'active'} onClick={()=>setSaveTab(false)}>Posts</button>
          <button className={saveTab?'active':''} onClick={()=>setSaveTab(true)}>Saved</button>
        </div>
      }
      {
        profile.loading
        ? <img className="d-block mx-auto my-4" src={LoadIcon} alt='loading'/>
        : <>
            {
              saveTab
              ? <Saved auth={auth} dispatch={dispatch} />
              :<Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            }
        </>
      }
      
    </div>
  )
}

export default Profile
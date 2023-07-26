import React, { useState,useRef,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
//import { createPost,updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
const TweetModal = () => {
  const { auth,theme,tweet } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("")
  const [isRecording,setIsRecording]=useState(false)
  const [recordings, setRecordings] = useState([]);
  const [audios,setAudios]=useState([])
  //const [images,setImages] = useState([])
  //const [tracks, setTracks] = useState()
  const audioRef = useRef()
  const currentAudioRef = useRef(null);
  const refCanvas = useRef()

  const handleAudioPlay = (event) => {
    const audio = event.target;

    if (currentAudioRef.current && currentAudioRef.current !== audio) {
      currentAudioRef.current.pause();
    }

    currentAudioRef.current = audio;
  };

  const handleChangeAudios=e=>{
    const files = e.target.files;
    const audioSrcs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);

      audioSrcs.push(url);
    }
    
    setAudios([...audios, ...audioSrcs]);
  }

  const handleStartRecording = async () => {
    try {
      setIsRecording(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recording = new MediaRecorder(stream);
      const newRecordings = [...recordings, { recording, chunks: [], audioURL: '' }];
      setRecordings(newRecordings);
      recording.start();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecording = (index) => {
    const recording = recordings[index].recording;
    recording.stop();
    setIsRecording(false)
    recording.ondataavailable = (event) => {
      const chunks = [...recordings[index].chunks, event.data];
      const newRecordings = [...recordings];
      newRecordings[index].chunks = chunks;
      setRecordings(newRecordings);
    };
    recording.onstop = () => {
      if (recordings.length > 0) { // check if recordings array has any elements
        const chunks = recordings[index].chunks;
        const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const audioURL = URL.createObjectURL(audioBlob);
        const newRecordings = [...recordings];
        newRecordings[index].audioURL = audioURL;
        setRecordings(newRecordings);
      }
    };
  };

  const deleteAudios=(index)=>{
    const newArr = [...audios]
    newArr.splice(index,1)
    setAudios(newArr)
  }

  const handleStopStream=()=>{
    handleStopRecording()
    recordings.pop()
    setIsRecording(false)
  }

  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   if(images.length===0 && content.length===0)
  //   return dispatch({
  //     type:GLOBALTYPES.ALERT,payload:{error:"Please add some content or photos"}
  //   })
  //   if(tweet.onEdit){
  //     dispatch(updatePost({content,images,auth,tweet}));
  //   }
  //   else{
  //     dispatch(createPost({content,images,auth,socket}));
  //   }
  //   setContent('')
  //   setImages([])
  //   if(tracks) tracks.stop()
  //   dispatch({type:GLOBALTYPES.TWEET,payload:false})
  // }

  useEffect(()=>{
    if(tweet.onEdit){
      setContent(tweet.content)
      setAudios(tweet.audios)
    }
  },[tweet])

  return (
    <div className="tweet_modal">
      {/* <form onSubmit={handleSubmit}>  */}
      <form>
        <div className="tweet_header">
          <h5 className="m-0">Create Tweet!</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.TWEET, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="tweet_body">
          <textarea
            name="content"
            value={content}
            placeholder={` Hey ${auth.user.username}! share your thoughts!`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              filter: theme ? 'invert(1)' : 'invert(0)',
              color: theme ? 'white' : '#111',
              background: theme ? 'rgba(0,0,0,.03)' : '',
          }}
          />
          <div className="d-flex">
              <div className="flex-fill"></div>
              <Icons setContent={setContent} content={content} theme={theme} />
          </div>
          <div className="show_audios">
            {
              audios.map((audio,index)=>(
                <div key={index} id="file_audio">
                  <>
                  {<audio controls src={audio} onPlay={handleAudioPlay}/>}
                  </>
                  <span onClick={()=>deleteAudios(index)}>&times;</span>
                </div>
              ))
            }
          </div>
          {
            isRecording &&
            <div className="stream position-relative">
              <audio  muted ref={audioRef} width="100%" height="100%"
              style={{filter:theme?'invert(1)':'invert(0)'}}/>

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{display:'none'}}/>
            </div>
          }
          <div className="input_images">
            {
              isRecording
              ?<i className="fas fa-stop text-danger" onClick={handleStopRecording}/>
              :
              <>
              <i className="fas fa-microphone" onClick={handleStartRecording} capture/>
              <div className="file_upload">
                <i className="fas fa-music" />
                <input type="file" name="file" id="file"
                  multiple accept="audio/*" onChange={handleChangeAudios}/>
              </div>
              </>
            }
          </div>
        </div>
        <div className="tweet_footer my-2">
            <button className="btn btn-secondary w-100" type="submit">
              Tweet
            </button>
        </div>
      </form>
    </div>
  );
};
export default TweetModal;

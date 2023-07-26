import React, { useState,useRef,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Icons from "./Icons";
const TweetModal = () => {
    const { auth,theme,tweet } = useSelector((state) => state);
    const [permission, setPermission] = useState(false);
    const dispatch = useDispatch();
    const [content, setContent] = useState("")
    const [audios,setAudios]=useState([])
    const [stream, setStream] = useState(null);
    const mimeType = "audio/*";
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    //const refCanvas = useRef()
    const currentAudioRef = useRef(null);

    
  
      const getMicrophonePermission = async () => {
          if ("MediaRecorder" in window) {
              try {
                  const streamData = await navigator.mediaDevices.getUserMedia({
                      audio: true,
                      video: false,
                  });
                  setPermission(true);
                  setStream(streamData);
                  
              } catch (err) {
                  alert(err.message);
              }
          } else {
              alert("The MediaRecorder API is not supported in your browser.");
          }
      };

    const handleAudioPlay = (event) => {
        const audio = event.target;
    
        if (currentAudioRef.current && currentAudioRef.current !== audio) {
          currentAudioRef.current.pause();
        }
    
        currentAudioRef.current = audio;
      };

    const handleAddAudios=e=>{
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

      const deleteAudios=(index)=>{
        const newArr = [...audios]
        newArr.splice(index,1)
        setAudios(newArr)
      }

      const handleStartRecording = async () => {
        setRecordingStatus(true);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };
      const handleStopRecording = () => {
        setRecordingStatus(false);
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
           const audioBlob = new Blob(audioChunks, { type: mimeType });
          //creates a playable URL from the blob file.
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudios([...audios,audioUrl]);
           setAudioChunks([]);
           setPermission(false);
           stream.getTracks()[0].stop()
        };
      };

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
                filter: theme ? "invert(1)" : "invert(0)",
                color: theme ? "white" : "#111",
                background: theme ? "rgba(0,0,0,.03)" : "",
              }}
            />
            <div className="d-flex">
              <div className="flex-fill"></div>
              <Icons setContent={setContent} content={content} theme={theme} />
            </div>
            <div className="show_audios">
              {audios.map((audio, index) => (
                <div key={index} id="file_audio">
                  <>{<audio controls src={audio} onPlay={handleAudioPlay} />}</>
                  <span onClick={() => deleteAudios(index)}>&times;</span>
                </div>
              ))}
            </div>
            
            {permission? 
            recordingStatus 
            ? (
              <div className="stream">
                <h2>Recording...</h2>
              </div>
            )
            :(
              <div className="stream">
                <h2>Click to start...</h2>
              </div>
            )
            :<></>
          }
            <div className="input_images">
              {permission ? (
                 recordingStatus
                ? <i className="fas fa-stop text-danger" onClick={handleStopRecording}/> 
                : <i className="fas fa-microphone" onClick={handleStartRecording} capture/>
              ) : (
                <>
                  <i className="fas fa-microphone" onClick={getMicrophonePermission} />
                  <div className="file_upload">
                    <i className="fas fa-music" />
                    <input type="file" name="file" id="file" multiple accept="audio/*" onChange={handleAddAudios}/>
                  </div>
                </>
              )}
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

}
export default TweetModal

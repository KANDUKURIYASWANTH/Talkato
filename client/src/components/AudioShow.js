import { useState, useRef } from "react";
const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mimeType = "audio/*";
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    
    const [audios,setAudios]=useState([]);
    const startRecording = async () => {
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
    const stopRecording = () => {
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
    const deleteAudios=(index)=>{
      const newArr=[...audios];
      newArr.splice(index,1);
      setAudios([...newArr]);
    }
    return (
      <>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {
            recordingStatus
            ?<button onClick={stopRecording} type="button">Stop Recording</button>
            :<button onClick={startRecording} type="button">Start Recording</button>
          }
          
        </div>

          <div className="audio-container">
            {audios.map((audio, index) =>(
              <div key={index} id="audio_file">
                <audio src={audio} controls></audio>
                <span onClick={()=>deleteAudios(index)}>&times;</span>
              </div>
            ))}
            
          </div>
      </>
    );
};
export default AudioRecorder;
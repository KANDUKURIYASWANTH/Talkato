import React from 'react'
import { useSelector } from 'react-redux'

const TweetCarousel = ({audios,id}) => {
    const isActive=index=>{
        if(index===0) return "active"
    }
    const {theme} = useSelector(state=>state);
  return (
    <div id={`image${id}`} className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            {
                audios.map((audio,index)=>(
                    <li key={index} data-target={`#image${id}`} data-slide-to={index} 
                    className={isActive(index)}></li>
                ))
            }
        </ol>
        <div className="carousel-inner">
            {
                audios.map((audio,index)=>(
                    <div key={index} className={`carousel-item ${isActive(index)}`}>
                        {
                            <audio controls src={audio.url} className="d-block active-audio" alt={audio.url}
                            style={{
                                filter:theme
                                ?'invert(1)'
                                :'invert(0)'
                            }}/>
                        }
                    </div>
                ))
            }
            
        </div>
        {
            audios.length>1 && 
            <>
                <a className="carousel-control-prev" href={`#image${id}`} role="button" data-slide="prev"
                style={
                    {width:'5%'}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={`#image${id}`} role="button" data-slide="next"
                style={{width:'5%'}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </>
        }
    </div>
  )
}

export default TweetCarousel
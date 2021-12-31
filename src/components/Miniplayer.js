import { useRef, useState } from "react";
import ReactPlayer from 'react-player/youtube'
import classes from "../styles/Miniplayer.module.css"
const Miniplayer = ({videoId, videoTitle}) => {

    const buttonRef = useRef();
    const [btnStatus, setBtnStatus] = useState(false);
    

    const toggleMiniPlayer = () => {
      if(!btnStatus){
        buttonRef.current.classList.remove(classes.floatingBtn);
        setBtnStatus(true);
      }else{
        buttonRef.current.classList.add(classes.floatingBtn);
        setBtnStatus(false);
      }
    }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleMiniPlayer}>
          <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
          <span onClick={toggleMiniPlayer} className={`material-icons-outlined ${classes.close}`}> close </span>
          <ReactPlayer
            className={classes.player}
            controls
            width="300px"
            height="168px"
            playing={btnStatus}
            url={`https://www.youtube.com/watch?v=${videoId}`} 
          />
          <p>{videoTitle}</p>
        </div>
    );
};

export default Miniplayer;
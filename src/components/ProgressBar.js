import { useRef, useState } from "react";
import classes from "../styles/Progressbar.module.css"
import Button from "./Button";

const ProgressBar = ({handleNextQuestion, handlePrevQuestion, progressPercentage, handleSubmitQuiz}) => {
    const [tooltip, setTooltip] = useState(false);
    const tooltipRef = useRef();

    const toggleTooltip = () => {
      if(tooltip){
        setTooltip(false);
        tooltipRef.current.style.display = "none";
      }else{
        setTooltip(true);
        tooltipRef.current.style.display = "block";
        tooltipRef.current.style.left = `calc(${progressPercentage}% - 65px)`;
      }
    }


    return (
        <div className={classes.progressBar}>
          <div className={classes.backButton} onClick={handlePrevQuestion}>
            <span className="material-icons-outlined"> arrow_back </span>
          </div>
          <div className={classes.rangeArea}>
            <div className={classes.tooltip} ref={tooltipRef}>
              {progressPercentage}% Cimplete!
            </div>
            <div className={classes.rangeBody}>
              <div 
                className={classes.progress} 
                style={{width: `${progressPercentage}%` }}
                onMouseOver={toggleTooltip}
                onMouseOut={toggleTooltip}>
              </div>
            </div>
          </div>
              <Button className={classes.next} onClick={progressPercentage === 100 ? handleSubmitQuiz :  handleNextQuestion}>
                <span>{progressPercentage === 100 ? "Submit Quiz" :  "Next Question"}</span>
                <span className="material-icons-outlined"> arrow_forward </span>
              </Button>
        </div>
    );
};

export default ProgressBar;
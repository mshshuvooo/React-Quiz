import classes from "../../styles/Analysis.module.css"
import AnalysisQuestions from "../quiz/AnalysisQuestions";
const Analysis = ({answers}) => {
    return (
        <div className={classes.analysis}>
          <h1>Question Analysis</h1>        
          <AnalysisQuestions answers={answers} />
        </div>
    );
};

export default Analysis;
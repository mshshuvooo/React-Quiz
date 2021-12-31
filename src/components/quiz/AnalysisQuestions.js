import classes from "../../styles/Question.module.css"
import QuizAnswers from "./QuizAnswers";

const QuizQuestion = ({answers = []}) => {
    return (
        answers.map( ( answer, index ) => {
            return(
                <div className={classes.question} key={index}>
                    <div className={classes.qtitle}>
                        <span className="material-icons-outlined"> help_outline </span>
                        {answer.title}
                    </div>
                    <QuizAnswers options={answer.options} enableCheckbox={false} />
                </div>
            )
        } )
        
    );
};

export default QuizQuestion;
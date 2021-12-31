import CheckboxInput from "../form/CheckboxInput";
import classes from "../../styles/Answers.module.css"
import { Fragment } from "react";

const QuizAnswers = ({options = [], handleAnswerSelect, enableCheckbox}) => {
    return (
        <div className={classes.answers}>

            {options.map( (option, index) => (
                <Fragment key = {index}>
                    {enableCheckbox ? (
                        <CheckboxInput 
                            className={classes.answer} 
                            label={option.title} 
                            value={index} 
                            checked={option.checked}
                            onChange = {(e) => handleAnswerSelect(e, index)}
                        />
                    ) : (
                        <CheckboxInput 
                            className={`${classes.answer} ${
                                option.correct ? classes.correct : option.checked ? classes.wrong : null
                            }`} 
                            label={option.title} 
                            defaultChecked={option.checked}
                            disabled
                        />
                    )}
                </Fragment>
            ) )}
              
        </div>
    );
};

export default QuizAnswers;
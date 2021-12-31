import Analysis from "../result/Analysis";
import Summary from "../result/Summary";
import {useLocation, useParams} from "react-router-dom"
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash"

const Result = () => {
    const {id} = useParams();
    const {state} = useLocation();
    const qna = state;
    const {error, loading, answers} = useAnswers(id)


    const calcaluteScore = () => {

        let score = 0;

        answers.forEach( (question, answerIndex) => {
            let correctItems = [];
            let checkedItems = [];

            question.options.forEach( ( option, optionIndex ) => {
                if( option.correct){
                    correctItems.push(optionIndex);
                }
                if( qna[answerIndex].options[optionIndex].checked) {
                    checkedItems.push(optionIndex);
                    option.checked = true;
                }
            } );


            if(_.isEqual(correctItems, checkedItems)){
                score = score + 5;
            }

        } );

        return score;
    }


    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>There was an error!</p>}
            {answers && answers.length > 0 &&(
                <>
                    <Summary score={calcaluteScore()} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
            
        </>
    );
};

export default Result;
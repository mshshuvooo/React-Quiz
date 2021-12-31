import {useState, useReducer, useEffect } from 'react';
import useQuestions from "../../hooks/useQuestions";
import {useAuth} from "../../context/AuthContext"
import {useParams, useNavigate, useLocation} from "react-router-dom";
import _ from "lodash";
import Miniplayer from "../Miniplayer";
import ProgressBar from "../ProgressBar";
import QuizAnswers from "../quiz/QuizAnswers";
import {getDatabase, ref, set} from "firebase/database"




const initialState = null;


const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach(question => {
                question.options.forEach( option => {
                    option.checked = false;
                } )
            })
            return action.value;
        case "answer" :
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked = action.isChecked;
            return questions;
        default :
            return state;  
    }
}


const Quiz = () => {

    const {id} = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const {error, loading, questions} = useQuestions(id);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const {appCurrentUser} = useAuth();
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect( () => {
        dispatch({
            type: "questions",
            value: questions,
        })
    }, [questions] )

    const handleAnswerSelect = (e, index) => {
        dispatch({
            type: "answer",
            questionId: currentQuestion,
            optionIndex: index,
            isChecked: e.target.checked
        })
    }

    const handleNextQuestion = () =>{
        if(currentQuestion <= questions.length){
            setCurrentQuestion( (prevCurrentQ) => prevCurrentQ + 1 )
        }
    }

    const handlePrevQuestion = () =>{
        if(currentQuestion >= 1 && currentQuestion <= questions.length){
            setCurrentQuestion( (prevCurrentQ) => prevCurrentQ - 1 )
        }
    }

    const progressPercentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    const handleSubmitQuiz = async() =>{
        const {uid} = appCurrentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);
        await set(resultRef, {
            [id]: qna
        })

        navigate( 
            `/result/${id}`,
            {state: qna}
        )

        
    }

    return (
        <>
        {loading && <p>Loading...</p>}
        {error && <p>There was an error!</p>}
        {!loading && !error && qna && qna.length > 0 && (
            <>
                <h1>{qna[currentQuestion].title}</h1>
                <h4>Question can have multiple answers</h4>
                <QuizAnswers options={qna[currentQuestion].options} handleAnswerSelect ={handleAnswerSelect} enableCheckbox={true} />
                <ProgressBar 
                    progressPercentage={progressPercentage} 
                    handleNextQuestion={handleNextQuestion} 
                    handlePrevQuestion={handlePrevQuestion} 
                    handleSubmitQuiz={handleSubmitQuiz} 
                />
                <Miniplayer videoId={id} videoTitle={state.videoTitle} />
            </>
            ) }
        </>
    );
};

export default Quiz;
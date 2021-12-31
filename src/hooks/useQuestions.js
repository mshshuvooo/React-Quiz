import { useEffect, useState } from "react";
import {getDatabase, ref, query, get, orderByKey} from "firebase/database"

const useQuestions = (videoID) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () =>{
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoID + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey()
            );

            try{
                setError(false);
                setLoading(true);
                const result = await get(quizQuery);
                setLoading(false);
                if(result.exists()){
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(result.val())];
                      });
                }
            }catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchQuestions();

    }, [videoID])


    return{
        error,
        loading,
        questions
    }
};

export default useQuestions;
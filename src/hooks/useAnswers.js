import { useEffect, useState } from "react";
import {getDatabase, ref, query, get, orderByKey} from "firebase/database"

const useAnswers = (videoID) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () =>{
            const db = getDatabase();
            const answersRef = ref(db, "answers/" + videoID + "/questions");
            const answersQuery = query(
                answersRef,
                orderByKey()
            );

            try{
                setError(false);
                setLoading(true);
                const result = await get(answersQuery);
                setLoading(false);
                if(result.exists()){
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(result.val())];
                      });
                }
            }catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchAnswers();

    }, [videoID])


    return{
        error,
        loading,
        answers
    }
};

export default useAnswers;
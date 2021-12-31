import { useEffect, useState } from "react";
import {getDatabase, ref, query, get, orderByKey, startAt, limitToFirst} from "firebase/database"

const useVideoList = (page) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const fetchVideos = async () =>{
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            );

            try{
                setError(false);
                setLoading(true);
                const result = await get(videoQuery);
                setLoading(false);
                if(result.exists()){
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(result.val())];
                      });
                }else{
                    setHasMore(false)
                }
            }catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchVideos();

    }, [page])


    return{
        error,
        loading,
        videos,
        hasMore
    }
};

export default useVideoList;
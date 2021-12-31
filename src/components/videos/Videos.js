import Video from "./Video";
import {Link} from "react-router-dom";
import useVideoList from "../../hooks/useVideoList";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from "react";

const Videos = () => {
    const [page, setPage] = useState(1);
    const {loading, error, videos, hasMore} = useVideoList(page);
    return (
        <div className="videos">
          
          {videos.length > 0 && (
            <InfiniteScroll 
              dataLength={videos.length} 
              hasMore={hasMore} 
              loader={<h4>Loading...</h4>} 
              next={() => setPage(page + 8)} 
            >
              {videos.map( (video) => video.noq > 0 ?(
                  <Link to={`/quiz/${video.youtubeID}`} state={{videoTitle: video.title}} key={video.youtubeID}>
                      <Video title={video.title} id={video.youtubeID} noq={video.noq} />
                  </Link>
              ):(
                <Video key={video.youtubeID} title={video.title} id={video.youtubeID} noq={video.noq} />
              ) )}
            </InfiniteScroll>
          )}

          {!loading && videos.length === 0 && <p>No deta found.</p>}
          {error && <p>There was an error.</p>}
          {loading && <p>Loading...</p>}
        </div>
    );
};

export default Videos;
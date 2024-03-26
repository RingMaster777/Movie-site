import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import "./style.scss";
import { removeFromWatchList } from "../../store/homeSlice";

const WatchList = () => {
  const { url, watchList } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const posterUrl = data.poster_path
  //   ? url.poster + data.poster_path
  //   : PosterFallback;

  const removeMovieFromWatchList = (item) => {
    console.log(item);
    dispatch(removeFromWatchList(item));
  };

  return (
    <div className="watchList">
      <ContentWrapper>
        <div className="heading">My WatchList</div>
        {watchList.length > 0 ? (
          watchList
            .slice()
            .reverse()
            .map((m) => {
              const posterUrl = m[0].poster_path
                ? url.poster + m[0].poster_path
                : PosterFallback;
              return (
                <>
                  <div className="item">
                    <div className="itemWrapper">
                      <div
                        className="posterBlock"
                        onClick={() => navigate(`/${m[2]}/${m[0].id}`)}
                      >
                        <Img className="posterImg" src={posterUrl} />
                      </div>
                      <div className="textBlock">
                        <span className="title">{m[0].title || m[0].name}</span>

                        <div className="info">
                          <span className="text bold">Released on:</span>
                          <span className="text">
                            {dayjs(m[0].release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                        <div className="info">
                          <span className="text bold">Type:</span>
                          <span className="text">
                            {m[2] === "movie" ? "Movie" : "TV series"}
                          </span>
                        </div>
                        <div className="info">
                          <span className="text bold">Added on: </span>
                          <span className="text">
                            {dayjs(m[1]).format("MMM D, YYYY")}
                          </span>
                        </div>

                        <button
                          className="btn"
                          onClick={() => removeMovieFromWatchList(m[0].id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
        ) : (
          <div className="message">
            WatchList is Empty. Search Movie To add into the WatchList
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default WatchList;

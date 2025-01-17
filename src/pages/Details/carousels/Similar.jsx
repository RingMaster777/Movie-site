import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "movie" ? "Similar Movies" : "Similar TV Shows";
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
    />
  );
};

export default Similar;

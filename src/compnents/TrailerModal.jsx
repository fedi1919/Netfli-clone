import axios from "axios";
import { useEffect, useState } from "react";

const TrailerModal = ({ watchTrailer, onClose, movieId }) => {
  const [trailer, setTrailer] = useState("");
  const [trailerID, setTrailerID] = useState("");
  const [key, setKey] = useState("");
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        );

        const index = data?.results?.findIndex(
          (item) => item.name === "Official Trailer"
        );

        setTrailerID(data?.results[index]?.id);

        setKey(data?.results[index]?.key);

        setTrailer(`https://www.youtube.com/embed/${key}`);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTrailer();
  }, [movieId, key, trailer]);

  const closeTrailer = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!watchTrailer) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 backdrop-blur-md flex justify-center items-center"
      onClick={closeTrailer}
    >
      <iframe
        width="900"
        height="500"
        src={trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TrailerModal;

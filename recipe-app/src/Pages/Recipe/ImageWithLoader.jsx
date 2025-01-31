import PropTypes from "prop-types";
import Shimmer from "../../Component/shimmer";


 const ImageWithLoader = ({ src, alt, loading, setloading }) => {
  
    return (
      <div
        className="hover-image "
        style={{ position: "relative", overflow: "hidden" }}
      >
        {loading && <Shimmer />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setloading(false)}
          style={{
            display: loading ? "none" : "block",
            objectFit: "cover",
            height:"100%",
  
          }}
        />
      </div>
    );
  };
  ImageWithLoader.propTypes = {
    src: PropTypes.any,
    alt: PropTypes.any,
    loading: PropTypes.any,
    setloading: PropTypes.any,
  };
  export default ImageWithLoader;
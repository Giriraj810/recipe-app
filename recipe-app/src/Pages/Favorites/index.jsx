import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Favorite, FavoriteBorder } from "@mui/icons-material"; // Import MUI Icons
import { Link } from "react-router-dom";
import ImageWithLoader from "../Recipe/ImageWithLoader";
import RecipePreview from "../Recipe/RecipePreview";
import info from "/info.png";

function Favorites(){
  const [page, setPage] = useState(1); // Current page state
  const [imgload, setimgload] = useState(false);


  // Handlers for pagination
 
  useEffect(() => {
    setimgload(true);
  }, [page]);
 

 
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  
 
  
  return (
    <>
      <div className="fsize-42 mt-3 bg-lightgreen fw-800 text-center">
        Favorite-Recipe
      </div>
      {/* <SearchBox onSearch={handleSearch} /> */}
      <div className="mx-5 text-end">
      <Link to={"/"}
        >
      <button
            onClick={null}
            className="btn btn-outline-primary ms-2"
            style={{
              transition: "all 0.3s ease",
              transform: "scale(1.05)",
            }}
          > Home</button>
          </Link>
          </div>

      <div className="mt-5 mx-0 row align-items-center">
        {favorites ? (
          favorites.map((recipe, index) => (
            <RenderData
              key={index}
              recipe={recipe}
              imgload={imgload}
              setimgload={setimgload}
              setPage={setPage}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
        {/* Pagination Buttons
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            onClick={handlePrevious}
            className="btn btn-outline-primary me-2"
            disabled={page === 1}
            style={{
              transition: "all 0.3s ease",
              transform: page === 1 ? "scale(1)" : "scale(1.05)",
            }}
          >
           <ArrowBackIcon /> Previous
          </button>
          <span className="mx-3">
            Page <strong>{page}</strong>
          </span>
          <button
            onClick={handleNext}
            className="btn btn-outline-primary ms-2"
            disabled={page === 8}
            style={{
              transition: "all 0.3s ease",
              transform: "scale(1.05)",
            }}
          >
            Next  <ArrowForwardIcon />
          </button>
        </div> */}
      </div>
    </>
  );
};

const RenderData = ({ recipe, imgload, setimgload }) => {
  const recipeData = recipe; // Full recipe object
  const recipeId = recipeData?.uri; // Unique identifier for the recipe
  const [isFavorite, setIsFavorite] = useState(false);
  const [openSub, setOpen] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.uri === recipeId)); // Check by URI
  }, [recipeId]);

  // Toggle favorite status
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites by filtering out the object with the same URI
      updatedFavorites = favorites.filter((fav) => fav.uri !== recipeId);
    } else {
      // Add to favorites (store the full recipe object)
      updatedFavorites = [...favorites, recipeData];
    }

    // Update localStorage and state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12 col-12 mb-2 mb-md-0">
      {/* Text Section */}
      <div className="mt-5 mb-3 pb-5 text-center" style={{ height: "20px" }}>
        <strong>{recipeData?.label}</strong>
      </div>

      {/* Image Section */}
      <div className="hover-image position-relative">
        {/* Heart Icon for Favorites */}
        <div
          className="position-absolute top-0 end-0 m-2"
          onClick={toggleFavorite}
          style={{
            cursor: "pointer",
            zIndex: "99",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {isFavorite ? (
            <Favorite fontSize="large" sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder fontSize="large" sx={{ color: "gray" }} />
          )}
        </div>
 <div
          className="position-absolute top-0 end-1 m-2"
          onClick={()=>setOpen(true)}
          style={{
            cursor: "pointer",
            zIndex: "99",
            transition: "all 0.3s ease-in-out",
          }}
        >
          
            <img src={info} style={{width:"45px"}} />
        
        </div>
        <ImageWithLoader
          src={recipeData?.image}
          alt={recipeData?.label}
          loading={imgload}
          setloading={setimgload}
        />
          <div className="pt-5 mb-3 pb-5 px-3 text-center" style={{ height: "20px" }}>
         <p>{recipeData?.healthLabels?.slice(0, 3).join(", ")}</p>
         </div>
                  <RecipePreview  recipeData={recipeData}  open={openSub} setOpen={setOpen} />
         
      </div>
    </div>
  );
};


// PropTypes for the RenderData component
RenderData.propTypes = {
  recipe: PropTypes.any,
  imgload: PropTypes.any,
  setimgload: PropTypes.any,
  setPage: PropTypes.any,
};

export default Favorites;

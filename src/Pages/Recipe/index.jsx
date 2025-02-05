import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetRecipesQuery } from "../../Service/recipe";
import SearchBox from "../../Component/SearchBox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import ImageWithLoader from "./ImageWithLoader";
import info from "/info.png";
import RecipePreview from "./RecipePreview";
import SelectMenuItem from "../../Component/SelectMenuItem";
const Recipes = () => {
  const [page, setPage] = useState(0); // Current page state
  const [selectedType, setselectedType] = useState("");
  const [allergies, setallergies] = useState("");
  const [diets, setdiets] = useState("");
  const [imgload, setimgload] = useState(true);
  const [search, setsearch] = useState("");
  const MealType = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
    { label: "Snack", value: "snack" },
  ];
  const Allergies = [
    { label: "Celery-free", value: "celery-free" },
    { label: "Crustacean-free", value: "crustacean-free" },
    { label: "Dairy-free", value: "dairy-free" },
    { label: "Egg-free", value: "egg-free" },
    { label: "Fish-free", value: "fish-free" },
    { label: "Gluten-free", value: "gluten-free" },
    { label: "Lupine-free", value: "lupine-free" },
    { label: "Mustard-free", value: "mustard-free" },
    { label: "Peanut-free", value: "peanut-free" },
    { label: "Sesame-free", value: "sesame-free" },
    { label: "Shellfish", value: "shellfish-free" },
    { label: "soy-free", value: "soy-free" },
    { label: "Tree-Nut-free", value: "tree-nut-free" },
    { label: "Wheat-free", value: "wheat-free" },
  ];
  const Diets = [
    { label: "Alcohol-free", value: "alcohol-free" },
    { label: "Balanced", value: "balanced" },
    { label: "High-fiber", value: "high-fiber" },
    { label: "High-Protein", value: "high-protein" },
    { label: "Keto", value: "keto" },
    { label: "Kidney-friendly", value: "kidney-friendly" },
    { label: "Kosher", value: "kosher" },
    { label: "Low-Carb", value: "low-carb" },
    { label: "Low-Fat", value: "low-fat" },
    { label: "Low potassium", value: "low-potassium" },
    { label: "Low-Sodium", value: "low-sodium" },
    { label: "No oil added", value: "no-oil-added" },
    { label: "No-sugar", value: "no-sugar" },
    { label: "Paleo", value: "paleo" },
    { label: "Pescatarian", value: "pescatarian" },
    { label: "Pork-free", value: "pork-free" },
    { label: "Red meat-free", value: "red-meat-free" },
    { label: "Sugar-conscious", value: "sugar-conscious" },
    { label: "Vegan", value: "vegan" },
    { label: "Vegetarian", value: "vegetarian" },
  ];
  const pagination = {
    start: page * 12 + 0,
    end: page * 12 + 12,
    mealType: selectedType,
    search: search,
    health: allergies,
    diet: diets,
  };
  const handleSearch = (query) => {
    setsearch(query);
  };
  const {
    data: recipeList,
    refetch,
    isLoading,
    isError,
  } = useGetRecipesQuery(pagination, {
    refetchOnMountOrArgChange: true,
  });
  // Handlers for pagination
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));
  useEffect(() => {
    refetch();
    setimgload(true);
  }, [page]);
  useEffect(() => {
  }, [recipeList]);

  if (isLoading) {
    return <div className="text-center">Loading recipes...</div>;
  }

  if (isError) {
    return <div className="text-center">Error loading recipes. Please try again.</div>;
  }

  return (
    <>
      <div className="fsize-42 mt-3 bg-lightgreen fw-800 text-center">
        Recipes-Corner
      </div>
      <SearchBox onSearch={handleSearch} />
      <div className="mt-4 mob-view row justify-content-between">
        <div className="filter-set  ms-5 ps-5 text-start d-flex col-md-12 col-lg-9 col-xl-7 col-sm-12 col-9 ">
<div className="filter-sub">
          <SelectMenuItem
            styles={"select"}
            name="mealType"
            option={MealType}
            value={selectedType}
            label="Select Type"
            handleChange={(e) => setselectedType(e.target.value)}
            placeholder=" Type"
          />
          <SelectMenuItem
            styles={"select"}
            name="health"
            option={Allergies}
            value={allergies}
            label="allergies"
            handleChange={(e) => setallergies(e.target.value)}
            placeholder=""
          />
          </div>
          <div className="filter-sub2">
          <SelectMenuItem
            styles={"select"}
            name="diet"
            option={Diets}
            value={diets}
            label="Select Diet"
            handleChange={(e) => setdiets(e.target.value)}
            placeholder=" Type"
          />
          </div>
        </div>
        <div className="px-5 favorite text-end col-md-12 col-lg-2 col-xl-2 col-sm-12 col-3">

          <Link to={"favorites"}>
            <button
              onClick={handleNext}
              className="btn btn-outline-primary ms-2"
              style={{
                transition: "all 0.3s ease",
                transform: "scale(1.05)",
              }}
            >
              Favorites
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-2 mx-0 row align-items-center">
        {recipeList?.hits ? (
          recipeList?.hits.map((recipe, index) => (
            <RenderData
              key={index}
              recipe={recipe}
              imgload={imgload}
              setimgload={setimgload}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center align-items-center my-4">
          <button
            onClick={handlePrevious}
            className="btn btn-outline-primary me-2"
            disabled={page === 0}
            style={{
              transition: "all 0.3s ease",
              transform: page === 0 ? "scale(1)" : "scale(1.05)",
            }}
          >
            <ArrowBackIcon /> Previous
          </button>
          <span className="mx-3">
            Page <strong>{page+1}</strong>
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
            Next <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </>
  );
};

const RenderData = ({ recipe, imgload, setimgload }) => {
  const recipeData = recipe?.recipe; // Full recipe object
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
    <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12 col-12 mb-2 mb-md-0 px-0">
      {/* Text Section */}
      <div className="pt-5 mb-3 pb-5 text-center" style={{ height: "20px" }}>
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
          onClick={() => setOpen(true)}
          style={{
            cursor: "pointer",
            zIndex: "99",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <img src={info} style={{ width: "45px" }} />
        </div>

        <ImageWithLoader
          src={recipeData?.image}
          alt={recipeData?.label}
          loading={imgload}
          setloading={setimgload}
        />
        <div
          className="pt-5 mb-3 pb-5 px-3 text-center"
          style={{ height: "20px" }}
        >
          <p>{recipeData?.healthLabels?.slice(0, 3).join(", ")}</p>
        </div>
        <RecipePreview
          recipeData={recipeData}
          open={openSub}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

// PropTypes for the RenderData component
RenderData.propTypes = {
  recipe: PropTypes.any,
  imgload: PropTypes.any,
  setimgload: PropTypes.any,
};

export default Recipes;

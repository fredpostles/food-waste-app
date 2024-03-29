import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoResults from "./SearchResults/NoResults";
import ShowResultsButtons from "./SearchResults/ShowResultsButtons";
import RecipeModal from "./SearchResults/RecipeModal";
import LoadingModal from "../Modal/LoadingModal";
import SingleRecipeResult from "./SearchResults/SingleRecipeResult";

const SearchResults = (props) => {
  const suggestions = props.suggestions;
  const ingredientSearch = useSelector((state) => state.ingredientSearch);
  const [showMore, setShowMore] = useState(11);
  const [openModal, setOpenModal] = useState(false);
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const recipeInfo = useSelector((state) => state.recipeInfo);
  const [isLoaded, setIsLoaded] = useState(true);

  const getModalContent = (recipe, info) => {
    let item;
    if (ingredientSearch) {
      item = ingredientSearch.find((element) => element.id === recipe.id);
    } else if (suggestions) {
      item = suggestions.find((element) => element.id === recipe.id);
    }
    setModalContent({ item, info });
  };

  const onShowMore = () => {
    setShowMore(showMore + 10);
  };

  const onShowLess = () => {
    if (showMore <= 21) {
      setShowMore(11);
    } else {
      setShowMore(showMore - 10);
    }
  };

  return (
    <div className="searchResults__container">
      {!isLoaded ? <LoadingModal /> : null}
      <ul className="recipeSearchResults__list">
        {suggestions
          ? suggestions?.map((recipe, index) => {
              if (index > showMore) return null;
              return (
                <li className="singleRecipe__container" key={recipe.id}>
                  <SingleRecipeResult
                    recipe={recipe}
                    showRecipeMethod={showRecipeMethod}
                    setShowRecipeMethod={setShowRecipeMethod}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getModalContent={getModalContent}
                    setIsLoaded={setIsLoaded}
                  />
                </li>
              );
            })
          : null}
        {!suggestions && ingredientSearch && ingredientSearch.length > 0
          ? ingredientSearch.map((recipe, index) => {
              if (index > showMore) return null;
              else
                return (
                  <li className="singleRecipe__container" key={recipe.id}>
                    <SingleRecipeResult
                      recipe={recipe}
                      showRecipeMethod={showRecipeMethod}
                      setShowRecipeMethod={setShowRecipeMethod}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      getModalContent={getModalContent}
                      setIsLoaded={setIsLoaded}
                    />
                  </li>
                );
            })
          : null}
      </ul>
      {(!suggestions && ingredientSearch && ingredientSearch.length === 0) ||
      (!ingredientSearch && suggestions && suggestions.length === 0) ? (
        <NoResults />
      ) : null}
      {suggestions || ingredientSearch ? (
        <ShowResultsButtons
          suggestions={suggestions}
          ingredientSearch={ingredientSearch}
          showMore={showMore}
          onShowMore={onShowMore}
          onShowLess={onShowLess}
        />
      ) : null}
      {openModal ? (
        <RecipeModal
          setShowRecipeMethod={setShowRecipeMethod}
          setOpenModal={setOpenModal}
          modalContent={modalContent}
          recipeInfo={recipeInfo}
        />
      ) : null}
    </div>
  );
};

export default SearchResults;

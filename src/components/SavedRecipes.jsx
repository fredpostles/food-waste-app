import React, { useState } from "react";
import { useSelector } from "react-redux";
import Recipe from "./SavedRecipes/Recipe";
import Navigation from "./Navigation";
import SavedRecipeTemplate from "./SavedRecipes/SavedRecipeTemplate";
import SavedRecipeModal from "./SavedRecipes/SavedRecipeModal";

const SavedRecipes = () => {
  const savedRecipes = useSelector((state) => state.savedRecipes);
  const [openModal, setOpenModal] = useState(false);
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);
  const [modalContent, setModalContent] = useState({ undefined });

  const getModalContent = (recipe) => {
    const item = savedRecipes.find((element) => element.id === recipe.id);

    setModalContent(item);
  };

  return (
    <>
      <Navigation />
      <div className="savedRecipeSection__container">
        <h1 className="section__heading">My Saved Recipes</h1>
        {savedRecipes.length < 1 ? <SavedRecipeTemplate /> : null}
        <div className="savedRecipes__container__grid">
          {savedRecipes && savedRecipes.length > 0
            ? savedRecipes.map((savedRecipe) => {
                return (
                  <Recipe
                    savedRecipe={savedRecipe}
                    key={savedRecipe.id}
                    id={savedRecipe.id}
                    showRecipeMethod={showRecipeMethod}
                    setShowRecipeMethod={setShowRecipeMethod}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getModalContent={getModalContent}
                  />
                );
              })
            : null}
        </div>
      </div>
      {openModal ? (
        <SavedRecipeModal
          setShowRecipeMethod={setShowRecipeMethod}
          setOpenModal={setOpenModal}
          modalContent={modalContent}
        />
      ) : null}
    </>
  );
};

export default SavedRecipes;

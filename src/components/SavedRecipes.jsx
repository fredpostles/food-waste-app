import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import SavedRecipeTemplate from "./SavedRecipes/SavedRecipeTemplate";
import SavedRecipeModal from "./SavedRecipes/SavedRecipeModal";
import LoadingModal from "./Modal/LoadingModal";
import Recipe from "./SavedRecipes/Recipe";
import { getSavedRecipes, deleteSavedRecipe } from "../apiCalls/backendAPI";

const SavedRecipes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);
  const [modalContent, setModalContent] = useState({ undefined });
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [savedRecipeCounter, setSavedRecipeCounter] = useState(0);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    setIsLoaded(false);
    const fetchSavedRecipes = async () => {
      try {
        const { savedRecipeResults } = await getSavedRecipes(token);
        console.log("savedRecipeResults", savedRecipeResults);
        setSavedRecipes(savedRecipeResults);
        setIsLoaded(true);
      } catch (error) {
        console.log("error fetching saved recipes:", error);
        setIsLoaded(true);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipeCounter, token]);

  const onDelete = async (recipe) => {
    try {
      await deleteSavedRecipe(token, recipe.id);
      // Update the savedRecipes state
      const updatedSavedRecipes = savedRecipes.filter(
        (element) => element.id !== recipe.id
      );
      setSavedRecipes(updatedSavedRecipes);
      setSavedRecipeCounter(savedRecipeCounter - 1);
    } catch (error) {
      console.log("onDelete error:", error);
    }
  };

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
                    key={savedRecipe.id}
                    savedRecipe={savedRecipe}
                    showRecipeMethod={showRecipeMethod}
                    setShowRecipeMethod={setShowRecipeMethod}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getModalContent={getModalContent}
                    onDelete={onDelete}
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
      {!isLoaded ? <LoadingModal /> : null}
    </>
  );
};

export default SavedRecipes;

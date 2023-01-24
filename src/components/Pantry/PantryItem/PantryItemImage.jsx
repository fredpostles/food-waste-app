import React from "react";

const PantryItemImage = ({ item }) => {
  const src = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;

  return (
    <>
      {item.image === "no" ? (
        <div className="pantryItem image__container">
          <p>No image</p>
        </div>
      ) : (
        <div
          className="pantryItem image__container"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      )}
    </>
  );
};

export default PantryItemImage;

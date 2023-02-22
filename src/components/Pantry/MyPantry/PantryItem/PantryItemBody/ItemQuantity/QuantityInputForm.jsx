import React from "react";

const QuantityInputForm = ({ handleInputChange, handleSubmit }) => {
  return (
    <form className="quantityInput__form" onSubmit={handleSubmit}>
      <div className="pantryItem__quantity__inputs">
        <label>
          <input
            className="pantryItem__quantityInput"
            name="amount"
            title="amount"
            type="number"
            id="quantity__amount__input"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <select
          name="units"
          title="units"
          id="quantity__units__input"
          onChange={handleInputChange}
          className="pantryItem__quantityInput__unitOptions"
          size={1}
        >
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="default"
          >
            {null}
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="grams"
          >
            g
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="millilitres"
          >
            ml
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="litres"
          >
            l
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="ounces"
          >
            oz
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="cups"
          >
            cups
          </option>
          <option
            className="pantryItem__quantityInput__unitOptions__option"
            value="kilograms"
          >
            kg
          </option>
        </select>
      </div>
      <button className="saveBtn" type="submit">
        Save
      </button>
    </form>
  );
};

export default QuantityInputForm;

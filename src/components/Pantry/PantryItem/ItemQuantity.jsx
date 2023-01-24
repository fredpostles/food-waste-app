import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_QUANTITY, CLEAR_QUANTITY } from "../../../redux/types";

const ItemQuantity = ({ item }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ amount: 0, units: "" });
  const [showControls, setShowControls] = useState(false);
  const pantryItems = useSelector((state) => state.pantryItems);

  const indexOfItem = pantryItems.findIndex(
    (element) => element.id === item.id
  );

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Amount", state.amount, "Units", state.units);
    dispatch({
      type: EDIT_QUANTITY,
      payload: {
        id: item.id,
        quantity: { amount: state.amount, units: state.units },
      },
    });
    setShowControls(!showControls);
    // console.log(indexOfItem);
    // console.log(pantryItems[indexOfItem]);
  };

  return (
    // at start, show 'add quantity' button
    // because item has no quantity when added to pantry

    // once clicked, show input so user can add quantity
    // two parts: text input for amount/number and select for units
    // when 'save' button is pressed, dispatch 'quantity' object (amount AND units) to store
    // and add to 'item' object for correct item in pantryItems array

    // then, get 'quantity' with useSelector and display in a <p> tag

    // 'add quantity' button should now show 'edit quantity' for item in question

    <>
      {showControls && (
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
      )}
      {state.amount > 0 && (
        <p className="pantryItem__quantity__value">
          Quantity:{" "}
          <span className="bold">{`${state.amount} ${state.units}`}</span>
        </p>
      )}
      {state.amount === 0 ? (
        <button
          className="addQuantityBtn"
          onClick={() => setShowControls(!showControls)}
        >
          Add quantity
        </button>
      ) : (
        <button
          className="editQuantityBtn"
          onClick={() => setShowControls(!showControls)}
        >
          Edit quantity
        </button>
      )}
    </>

    // <>
    //   {item.quantity ? (
    //     <p>Quantity: {(item.quantity.name, item.quantity.value)}</p>
    //   ) : null}
    //   {showQuantity ? (
    //     <div className="pantryItem__quantity">
    //       <label>Quantity: </label>
    //       <span>
    //         <input
    //           type="text"
    //           className="pantryItem__quantityInput"
    //           name="amount"
    //           id="quantityInput"
    //           onChange={handleInputChange}
    //         />
    //         <select
    //           className="pantryItem__quantityInput__unitOptions"
    //           size={1}
    //           onChange={handleInputChange}
    //           name="units"
    //         >
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="default"
    //           >
    //             Default
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="grams"
    //           >
    //             g
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="millilitres"
    //           >
    //             ml
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="litres"
    //           >
    //             l
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="ounces"
    //           >
    //             oz
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="cups"
    //           >
    //             cups
    //           </option>
    //           <option
    //             className="pantryItem__quantityInput__unitOptions__option"
    //             value="kilograms"
    //           >
    //             kg
    //           </option>
    //         </select>
    //       </span>
    //       <button type="submit" name="save" onClick={onSave}>
    //         Save
    //       </button>
    //       <button
    //         onClick={() => {
    //           dispatch({ type: CLEAR_QUANTITY, payload: null });
    //         }}
    //       >
    //         Remove quantity
    //       </button>
    //       <button
    //         onClick={() => {
    //           setShowQuantity(false);
    //         }}
    //       >
    //         X
    //       </button>
    //     </div>
    //   ) : (
    //     <button onClick={onAddQuantity}>Add quantity</button>
    //   )}
    // </>
  );
};

export default ItemQuantity;

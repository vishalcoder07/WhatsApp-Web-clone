
// React context API
import React, { createContext, useContext, useReducer } from "react";

//preparing the data layer
export const StateContext = createContext();

//higher order compon
export const StateProvider = ({ reducer, initialState, children }) => (

  <StateContext.Provider value={useReducer(reducer, initialState)}>

    {children}

  </StateContext.Provider>
);


//Hook Which allows us to pull information from the data layer
export const useStateValue = () => useContext(StateContext);
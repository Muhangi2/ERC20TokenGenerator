import React, { useEffect, useState, useContext, createContext } from "react";

// Create the context
const apiprovider = createContext();

// Define the context provider component
 const ContextProvider = ({ children }) => {
  // Define state for the address
  const [address, setAddress] = useState("elioda");

  return (
    // Provide the context value using the value prop
    <apiprovider.Provider value={{ address, setAddress }}>
      {children}
    </apiprovider.Provider>
  );
};
export  default ContextProvider;
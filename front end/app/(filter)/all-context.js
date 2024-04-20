"use client";
import React, { createContext, useState } from "react";

export const AllContext = createContext({
  finemessage: "",
  location: "",
  recommend: "",
});

function AllContextProvider({ children }) {
  const [location, setLocation] = useState({});
  const [recommend, setRecommend] = useState({});
  const [finemessage, setFinemessage] = useState("");
  
  // Fetch data and update state here
  
  return (
    <AllContext.Provider value={{ location, recommend, finemessage }}>
      {children}
    </AllContext.Provider>
  );
}

export default AllContextProvider;

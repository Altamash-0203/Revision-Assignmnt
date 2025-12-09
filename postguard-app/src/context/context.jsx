import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

let AppContext = createContext();

export let useCon = () => useContext(AppContext);

function ContextPro({ children }) {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  let [over, setOver] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  let lastUser = (section, id=null) => {
    localStorage.setItem("lastU", JSON.stringify({ section, id }));
  };

  let getLast = () => {
    let i = localStorage.getItem("lastU");
    return i ? JSON.parse(i) : null;
  };

  return (
    <React.Fragment>
    <AppContext.Provider
      value={{ user, loading, over, setOver, lastUser, getLast }}
    >
      {children}
    </AppContext.Provider>
    </React.Fragment>
  );
}
export default ContextPro;

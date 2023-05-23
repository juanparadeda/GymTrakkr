import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import HomeNavigation from "../navigation/HomeNavigation";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [defRoute, setDefRoute] = useState(null);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setTimeout(() => setCanRender(true), 1000);
  }, []);
  useEffect(() => {
    user ? setDefRoute("Main Navigation") : setDefRoute("Login");
  }, [user]);
  return canRender ? <HomeNavigation props={{ defRoute }} /> : <></>;
};

export default Home;

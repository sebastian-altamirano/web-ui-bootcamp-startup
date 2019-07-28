import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "./FloatingButton.scss";

function FloatingButton({ location: { pathname: path } }) {
  const [icon, setIcon] = useState("+");
  const [route, setRoute] = useState("/add");

  // Floating button route is:
  // movie/:id if in edit/:id
  // add if anywhere else
  const getRoute = () => {
    return path.includes("/movie/")
      ? `/edit/${path.replace(/[a-z/]/g, "")}`
      : "/add";
  };

  // Floating button is hidden in "edit" and "add" routes.
  const isHidden = () => {
    return path === "/add" || path.includes("/edit/") ? true : false;
  };

  useEffect(() => {
    setIcon(path === "/" ? "+" : "✎");
    setRoute(getRoute());
  });

  return (
    <button className={`floating-button ${isHidden() && "hidden"}`}>
      <Link to={route}>{icon}</Link>
    </button>
  );
}

export default withRouter(FloatingButton);

import "./NavBar.css";
import { MenuItems } from "./MenuItems";
import { useState } from "react";
import { Button } from "../Button";

const NavBar = () => {
  const [state, setState] = useState({ clicked: false });

  const handleClick = () => {
    setState({ clicked: !state.clicked });
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        SocioClub
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <form className="btnLogin" action="/login">
        <Button type="submit">Login</Button>
      </form>
    </nav>
  );
};

export default NavBar;

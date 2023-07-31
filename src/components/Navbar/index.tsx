import {
  Email,
  EmailOutlined,
  Favorite,
  FavoriteBorder,
  HomeOutlined,
  HomeRounded,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

import styles from "./index.module.scss";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    {
      to: "/",
      text: "Home",
      iconOutline: <HomeOutlined />,
      iconFilled: <HomeRounded />,
    },
    {
      to: "/favorites",
      text: "Favorites",
      iconOutline: <FavoriteBorder />,
      iconFilled: <Favorite />,
    },
    {
      to: "/contacts",
      text: "Contacts",
      iconOutline: <EmailOutlined />,
      iconFilled: <Email />,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={styles.navbar__link}>
              {location.pathname === link.to
                ? link.iconFilled
                : link.iconOutline}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

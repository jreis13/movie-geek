import {
  Email,
  EmailOutlined,
  Favorite,
  FavoriteBorder,
  HomeOutlined,
  HomeRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

function Navbar() {
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const navLinks = [
    {
      href: "/",
      text: "Home",
      iconOutline: <HomeOutlined />,
      iconFilled: <HomeRounded />,
    },
    {
      href: "/favorites",
      text: "Favorites",
      iconOutline: <FavoriteBorder />,
      iconFilled: <Favorite />,
    },
    {
      href: "/contact",
      text: "Contact",
      iconOutline: <EmailOutlined />,
      iconFilled: <Email />,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        {navLinks.map((link) => (
          <li className={styles.navbar__item} key={link.href}>
            <a className={styles.navbar__link} href={link.href}>
              {activeLink === link.href ? link.iconFilled : link.iconOutline}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

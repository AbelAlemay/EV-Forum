import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./Header.module.css";
import logo from "../../assets/evangadi-logo-header.png";
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to={user ? "/home" : "/"} className={styles.brand}>
        <img src={logo} alt="Evangadi Logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink className={styles.link} to={user ? "/home" : "/"}>
          Home
        </NavLink>
        <NavLink className={styles.link} to="/how-it-works">
          How it Works
        </NavLink>
        <NavLink className={styles.link} to="/api-docs">
          API Docs
        </NavLink>

        {user ? (
          <button
            className={styles.btn}
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            LogOut
          </button>
        ) : (
          <NavLink className={styles.btn} to="/">
            SIGN IN
          </NavLink>
        )}
      </nav>
    </header>
  );
}

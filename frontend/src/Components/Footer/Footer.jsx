import styles from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerlog from "../../assets/EV-logo-white.png";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <img src={footerlog} alt="footerlogo" />
        <p className={styles.muted}>Evangadi Networks Q&amp;A</p>
        <div className={styles.social}>
          <Link to="/">
            <FaFacebook />
          </Link>
          <Link to="/">
            <FaXTwitter />
          </Link>
          <Link to="/">
            <FaLinkedin />
          </Link>
          <Link to="/">
            <FaInstagram />
          </Link>
          <Link to="/">
            <FaYoutube />
          </Link>
        </div>
      </div>

      <div className={styles.muted}>
        <Link to="/">
          <b>Useful Link</b>
        </Link>
        <Link to="/HowItWorks">
          <p>How it works</p>
        </Link>
        <Link to="/">
          <p>Terms of Service</p>
        </Link>
        <Link to="/">
          <p>Privacy policy</p>
        </Link>
      </div>

      <div className={styles.muted}>
        <Link to="/">
          <b>Contact Info</b>
        </Link>
        <Link to="/">
          <p>support@evangadi.com</p>
        </Link>
        <Link to="/">
          <p>+1-202-386-2702</p>
        </Link>
      </div>
    </footer>
  );
}

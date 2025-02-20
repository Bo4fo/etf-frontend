import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/components/footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      {/* Social Icons on the Left */}
      <div className="footer-icons">
        <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
        <FontAwesomeIcon icon={faYoutube} className="footer-icon" />
        <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
      </div>

      {/* Copyright Text in the Middle */}
      <div className="footer-copyright">
        © {currentYear} Cunningz. All rights reserved.
      </div>

      {/* Country & Language on the Right */}
      <div className="footer-options">
        <select className="country-select" defaultValue="es">
          <option value="en" disabled>
            Country ES
          </option>
          <option value="us">United States</option>
          <option value="es">Spain</option>
          <option value="gh">Ghana</option>
          {/* Add more options as needed */}
        </select>
        {/* <select className="language-select" defaultValue="en">
        <option value="en" disabled>Language EN</option>
          <option value="en">ENGLISH </option>
          <option value="es">Spanish</option>
     
        </select> */}
      </div>
    </footer>
  );
}

export default Footer;

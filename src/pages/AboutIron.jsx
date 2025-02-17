import React from "react";
import "../assets/styles/pages/aboutUs.css";
import AboutIron from "../components/common/AboutIronBanner";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy">
      {/* Add image on top using URL */}
      {/* <div className="about-image-container">
        <img
          src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/about.jpg"
          alt="About Us Banner"
          className="about-image"
        />
      </div> */}

      <AboutIron />
      <hr style={{ border: "0.2px solid white" }} />

      <p>
        Iron Boy x CUNNINGZ represents the powerful union of Ghana’s emerging
        fashion brand and global icon Black Sherif, inspired by his
        groundbreaking album. This collaboration goes beyond fashion—it’s a bold
        statement of resilience, triumph, and creative excellence, merging the
        worlds of music and style.
      </p>
      <p>
        The connection between Black Sherif and CUNNINGZ runs deep, tracing back
        to the early days of his music career. As Blacko’s journey unfolded,
        CUNNINGZ became an integral part of his artistic expression, shaping his
        fashion sense through music videos, performances, and his signature
        lifestyle. The brand has been more than just clothing—it has been a
        visual extension of Black Sherif’s story, reflecting his raw
        authenticity and relentless pursuit of greatness.
      </p>
      <p>
        The collection features 8 exclusive designs, each limited to just 15
        pieces—except for two signature designs inspired by the album, which are
        not limited. Every piece tells a story of perseverance, individuality,
        and success, celebrating those who have overcome challenges to achieve
        greatness.
      </p>
      <p>
        Crafted for “the winners”—creative, ambitious individuals who embody
        determination—this partnership fuses Black Sherif’s raw artistry with
        CUNNINGZ’s innovative streetwear, honoring the limitless potential of
        the human spirit. .
      </p>
      <p>
        To preserve its exclusivity, this collaboration brings together a
        community that celebrates style, substance, and the triumph of the human
        spirit, inspired by the music and profound message of
        Black Sherif’s album.
      </p>
    </div>
  );
};

export default ShippingPolicy;

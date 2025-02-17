import React from "react";
import "../assets/styles/pages/aboutUs.css";
import AboutUs from "../components/common/AboutBanner";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy">
      {/* Add image on top using URL */}
      <div className="about-image-container">
        <img
          src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/about.jpg"
          alt="About Us Banner"
          className="about-image"
        />
      </div>

      <AboutUs />
      <hr style={{ border: "0.2px solid white" }} />

      <p>
        Founded by visionary traders Prince Awortwe and Solomon Yamoah, CUNNINGZ
        is a high-fashion streetwear brand rooted in the vibrant city of Accra.
        Inspired by the dynamic energy of Kantamanto and enriched by a deep
        understanding of fashion, we are committed to redefining style for
        individuals who seek distinctive, creative, and premium clothing. With a
        global perspective, we aim to showcase our innovative designs to
        audiences worldwide, pushing boundaries and challenging norms in the
        fashion industry.
      </p>
      <p>
        CUNNINGZ represents resilience, adaptability, and ingenuity. Our name
        embodies a mindset of persistence and determination, inspiring
        individuals to thrive in every aspect of life while remaining true to
        their unique identities. We channel the triumph of overcoming challenges
        into our designs, blending creativity with intention to honor the
        strength, perseverance, and boundless potential of the human spirit.
      </p>
      <p>
        Our vision is to empower and inspire a global community of creative
        achievers—those we call “winners.” Through meticulously crafted, highly
        coveted fashion pieces, we strive to reflect the journeys and successes
        of those who dare to stand out. By setting new standards in innovation
        and exclusivity, our collaborations speak to individuals who value both
        style and substance.
      </p>
      <p>
        At CUNNINGZ, we believe in the power of resilience and the potential to
        succeed, no matter the obstacles. Our mission is to foster a mindset of
        determination and achievement, inspiring individuals to embrace their
        uniqueness, overcome adversity, and redefine success on their own terms.
      </p>
    </div>
  );
};

export default ShippingPolicy;

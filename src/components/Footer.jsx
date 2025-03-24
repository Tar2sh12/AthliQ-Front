import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);

    return () => {
      document.head.removeChild(tailwindScript);
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);
  return (
    <footer class="bg-green-600 text-white py-8 inset-x-0 bottom-0">
      <div class="container mx-auto flex justify-between items-center px-2">
        <p class="text-sm">
          &copy; 2025 ChampionMaker - Helwan University Students. All rights
          reserved
        </p>
        <div class="flex space-x-4">
          {/* <a class="text-white hover:text-gray-300">
            Privacy Policy
          </a>
          <a class="text-white hover:text-gray-300">
            Terms of Service
          </a>
          <a class="text-white hover:text-gray-300">
            Contact Us
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

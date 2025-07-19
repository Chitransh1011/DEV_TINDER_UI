import React from "react";

const Footer = () => {
  return (
    <footer className="footer items-center justify-between flex-wrap p-6 bg-base-300 text-base-content shadow-md">
      <div className="flex items-center gap-4">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-primary"
        >
          <path d="..." /> {/* You can keep your SVG path here */}
        </svg>
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>

      <div className="flex gap-4">
        <a href="#" aria-label="Twitter" title="Twitter" className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="..." />
          </svg>
        </a>
        <a href="#" aria-label="YouTube" title="YouTube" className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="..." />
          </svg>
        </a>
        <a href="#" aria-label="Facebook" title="Facebook" className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="..." />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

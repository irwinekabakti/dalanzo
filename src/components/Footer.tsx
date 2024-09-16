import { FC } from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// import { RiTwitterXFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";

const Footer: FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="w-full bg-blue-600 border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-gray-600">
            <Link to="/" className="text-white hover:underline">
              Cookie preferences
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/" className="text-white hover:underline">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/" className="text-white hover:underline">
              Purchase conditions
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/" className="text-white hover:underline">
              Cookie policy
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-gray-600">
            <Link to="/" className="border p-1 rounded-full">
              <AiFillFacebook size={20} className="text-white" />
            </Link>
            <Link to="/" className="border p-1 rounded-full">
              <AiFillInstagram size={20} className="text-white" />
            </Link>
            <Link to="/" className="border p-1 rounded-full">
              <AiFillYoutube size={20} className="text-white" />
            </Link>
            <Link to="/" className="border p-1 rounded-full">
              <RiTwitterXLine size={20} className="text-white" />
            </Link>
          </div>
          <div className="text-center text-white text-sm max-w-2xl">
            <p className="text-base">
              &copy; {year} Dalanzo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

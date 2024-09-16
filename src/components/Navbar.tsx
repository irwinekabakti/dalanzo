import { FC, useState, useRef, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex h-16 justify-between bg-blue-600 text-white items-center px-2 md:px-4">
      <div className="logo cursor-pointer">
        <h1 className="text-2xl bg-orange-500">Dalanzo</h1>
      </div>

      <div className="search flex relative items-center">
        <div className="relative">
          <IoSearch
            size={24}
            className={`${
              searchOpen ? "text-black" : " text-black"
            } cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 z-10`}
            onClick={toggleSearch}
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            className={`w-full pl-10 pr-4 py-2 rounded-md text-black transition-all duration-300 ${
              searchOpen || window.innerWidth >= 768
                ? "w-40 opacity-100"
                : "w-0 opacity-0 sm:hidden"
            }`}
          />
        </div>
      </div>

      <div className="sm:block md:hidden">
        {menuOpen ? (
          <IoClose size={24} className="cursor-pointer" onClick={toggleMenu} />
        ) : (
          <IoMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
        )}
      </div>

      <div
        className={`links cursor-pointer ${
          menuOpen ? "block absolute top-16 min-h-screen w-1/2" : "hidden "
        } right-0 bg-blue-600 md:relative md:flex md:bg-transparent`}
      >
        <ul className="flex flex-col md:flex-row justify-around gap-4 md:p-0">
          <li className="mx-auto md:mx-2 my-auto">Product</li>
          <li className="mx-auto md:mx-2 my-auto">
            <FaCartShopping size={24} />
          </li>
          <li
            className={`mx-auto md:mx-2 my-auto rounded-lg ${
              menuOpen ? "bg-green-500 py-2 px-14" : "bg-red-500 py-2 px-4"
            }`}
          >
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

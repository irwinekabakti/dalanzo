import { FC, useState, useRef, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import CustomModal from "./ui/CustomModal";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchProducts } from "../store/slice/products-slice";
import logoImg from "../assets/logo.svg";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLogoutModalVisible, setIsLogoutModalVisible] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = localStorage.getItem("access_token");

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("access_token");
    setIsLogoutModalVisible(false);
    navigate("/products-list");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchProducts(event.target.value));
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

  const handleProductsList = () => {
    navigate("/products-list");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <nav className="flex h-16 w-full justify-between bg-blue-600 text-white items-center px-2 md:px-4">
        <div
          className="flex items-center py-1 px-2 cursor-pointer gap-2"
          onClick={handleProductsList}
        >
          <img src={logoImg} alt="logo-img" className="h-6 w-6" />
          <h1 className="text-2xl ">Dalanzo</h1>
        </div>

        <div
          className={`${
            location.pathname !== "/products-list"
              ? "hidden"
              : "search flex relative items-center"
          } `}
        >
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
              onChange={handleSearchInputChange}
            />
          </div>
        </div>

        <div className="sm:block md:hidden">
          {menuOpen ? (
            <IoClose
              size={24}
              className="cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <IoMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <div
          className={`links cursor-pointer ${
            menuOpen
              ? "block absolute top-16 min-h-screen w-1/2 z-10"
              : "hidden "
          } right-0 bg-blue-600 md:relative md:flex md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row justify-around gap-4 md:p-0">
            <li
              className="mx-auto md:mx-2 my-auto"
              onClick={handleProductsList}
            >
              Products List
            </li>
            <li
              className="mx-auto md:mx-2 my-auto relative"
              onClick={handleCartClick}
            >
              <FaCartShopping size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </li>
            <li
              className={`mx-auto md:mx-2 my-auto rounded-lg ${
                menuOpen ? "py-2 px-14" : "py-2 px-4"
              } ${
                user
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={user ? handleLogoutClick : () => navigate("/sign-in")}
            >
              {user ? "Logout" : "Login"}
            </li>
          </ul>
        </div>
      </nav>

      <CustomModal
        title="Are you sure you want to logout ?"
        isVisible={isLogoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        onClose={handleLogoutCancel}
      />
    </>
  );
};

export default Navbar;

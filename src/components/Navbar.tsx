import { FC, useState, useEffect, useRef } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomModal from "./ui/CustomModal";
import { useAppDispatch, useAppSelector } from "../store";
import { userLogout } from "../store/slice/auth-slice";
import logoImg from "../assets/logo.svg";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] =
    useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { userInfo } = useAppSelector((state) => state.auth);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(userLogout());
    setIsLogoutModalVisible(false);
    setDropdownOpen(false);
    navigate("/products-list");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleProductsList = () => {
    navigate("/products-list");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleAccountClick = () => {
    setDropdownOpen(!dropdownOpen);
    // setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex h-16 w-full justify-between bg-blue-600 text-white items-center px-2 md:px-4">
        <div
          className="flex items-center py-1 px-2 cursor-pointer gap-2"
          onClick={handleProductsList}
        >
          <img src={logoImg} alt="logo-img" className="h-6 w-6" />
          <h1 className="text-2xl">Dalanzo</h1>
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
              className="mx-auto md:mx-2 my-auto hover:text-gray-200"
              onClick={handleProductsList}
            >
              Products List
            </li>
            <li
              className="mx-auto md:mx-2 my-auto relative hover:text-gray-200"
              onClick={handleCartClick}
            >
              <FaCartShopping size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </li>

            <li className="relative mx-auto hover:text-gray-200">
              {userInfo ? (
                <div className="flex items-center cursor-pointer">
                  <MdAccountCircle
                    size={24}
                    onClick={handleAccountClick}
                    className="cursor-pointer"
                  />
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={handleAccountClick}
                  >
                    {userInfo.name.firstname} {userInfo.name.lastname}
                  </span>

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 w-32 z-20"
                      style={{ top: "100%" }}
                    >
                      <div
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleSignIn}
                >
                  <IoIosLock size={24} />
                  <span className="ml-2">My Account</span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <CustomModal
        title="Are you sure you want to logout?"
        isVisible={isLogoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        onClose={handleLogoutCancel}
      />
    </>
  );
};

export default Navbar;

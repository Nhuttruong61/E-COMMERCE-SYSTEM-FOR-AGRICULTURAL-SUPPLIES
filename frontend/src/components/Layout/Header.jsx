import React, { memo, useEffect, useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { BsBox } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/action/userAction";
import DropdownComponet from "../Dropdown";
import Navbar from "../Navbar";
import logo from "../../assets/logo/logo.png";
import Cart from "../Cart/Cart";
import { clearQuantity } from "../../redux/action/cartAction";
import { HiOutlineMenu } from "react-icons/hi";
import "../../assets/css/right.css";
import "../../assets/css/left.css";
function Header() {
  const user = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product);
  const [show, setShow] = useState(true);
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [ishownInUser, setIsShownInUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [activeMobile, setActiveMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (products && products.data.length > 0) {
      let res = products.data;
      setProductData(res);
    }
  }, [products]);
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearch(searchItem);
    if (productData && productData.length > 0) {
      const filterSearch =
        productData &&
        productData.filter((product) => {
          return product.name.toLowerCase().includes(searchItem.toLowerCase());
        });
      setSearchData(filterSearch);
    }
  };
  const handleSubmitSearch = () => {
    navigate(`/products?name=${search}`);
    setSearch("");
  };
  const handleLogout = () => {
    dispatch(LogoutUser());
    dispatch(clearQuantity());
    setIsShownInUser(false);
    navigate("/login");
  };
  const handleNavigateProfile = () => {
    setIsShownInUser(false);
    navigate(`/profile?${1}`);
  };
  const handleNavigateOrder = () => {
    setIsShownInUser(false);
    navigate(`/profile?${2}`);
  };
  const handleNavigateAddress = () => {
    setIsShownInUser(false);
    navigate(`/profile?${3}`);
  };
  const handleNavigateAdmin = () => {
    setIsShownInUser(false);
    navigate("/system/admin");
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div>
      <div className=" justify-between h-[74px] items-center md:px-8 w-full px-1 hidden sm:flex">
        <Link to="/" className=" w-[25%] flex items-center">
          <img src={logo} alt="" className=" md:w-[10%] w-[40%]" />
          {show && (
            <p className="text-xs md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0e9c49] to-[#e49200]">
              Nông Nghiệp Xanh
            </p>
          )}
        </Link>
        <div
          className={
            show
              ? "h-[30px] md:h-[42px] border bg-[white] items-center flex  w-[50%]   rounded-[8px]"
              : "h-[30px] md:h-[42px] border bg-[white] items-center flex  w-[50%]   rounded-[8px]"
          }
        >
          <input
            className="h-[30px]  items-center outline-none w-[90%] rounded-l-[8px] px-2 text-[80%] md:text-[100%]"
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={search}
            onChange={handleSearch}
          />
          {searchData && searchData.length !== 0 && search !== "" ? (
            <div className="absolute min-h-[30vh] w-[48%] top-[10%] mt-2 bg-white shadow-md border rounded overflow-y-auto z-20 text-[80%] md:text-[100%]">
              {searchData.map((item, index) => {
                return (
                  <Link
                    to={`/product/details/${item._id}`}
                    key={index}
                    onClick={() => setSearch("")}
                  >
                    <div className="w-full flex items-start py-3">
                      <img
                        src={item.images[0].url}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h2 className="">{item.name}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}

          <div className="h-full items-center flex justify-center w-[10%]  bg-[#009b49] hover:bg-[#4d8208] rounded-r-[8px] cursor-pointer">
            <SearchOutlined
              className=" text-white text-[12px] md:text-[24px]"
              onClick={handleSubmitSearch}
            />
          </div>
        </div>
        <div
          className={
            show
              ? " flex justify-between items-center w-[25%]"
              : " flex justify-between items-center w-[40%]"
          }
        >
          <div className="flex justify-center items-center px-4">
            {show ? (
              <div className="border border-[#009b49] rounded-full mx-2 ">
                {user?.account?.avatar ? (
                  <img
                    className="w-[40px] h-[40px] object-cover rounded-full"
                    src={user.account.avatar.url}
                    alt=""
                  />
                ) : (
                  <UserOutlined className="text-[24px] p-2 text-[#009b49]" />
                )}
              </div>
            ) : null}
            <div className="relative z-10 text-[100%] font-[600]">
              {user?.isAuthenticated ? (
                <div
                  className="cursor-pointer "
                  onClick={() => setIsShownInUser(!ishownInUser)}
                >
                  <p>{user.account.name}</p>
                </div>
              ) : (
                <div className="md:text-[0.8rem]  ">
                  <p
                    className="hover:text-red-500 cursor-pointer font-[600]"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Đăng nhập
                  </p>
                  <p
                    className="hover:text-red-500 cursor-pointer font-[600]"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Đăng kí
                  </p>
                </div>
              )}
              {ishownInUser && (
                <div className="absolute h-auto w-[120px] bg-white rounded-[4px]">
                  <div
                    className="hover:bg-[#0e9c49] hover:text-white cursor-pointer p-2 flex items-center"
                    onClick={handleNavigateProfile}
                  >
                    <UserOutlined />
                    <p className="ml-1">Tài khoản</p>
                  </div>

                  {user?.account?.role === "admin" && (
                    <div className="hover:bg-[#0e9c49] hover:text-white cursor-pointer p-2 flex items-center">
                      <SettingOutlined />
                      <p className="ml-1" onClick={handleNavigateAdmin}>
                        Quản lý
                      </p>
                    </div>
                  )}
                  <div className="hover:bg-[#0e9c49] cursor-pointer hover:text-white p-2 flex items-center">
                    <BsBox />
                    <p className="ml-1" onClick={handleNavigateOrder}>
                      Đơn hàng
                    </p>
                  </div>
                  <div className="hover:bg-[#0e9c49] cursor-pointer hover:text-white p-2 flex items-center">
                    <HomeOutlined />
                    <p className="ml-1" onClick={handleNavigateAddress}>
                      Địa chỉ
                    </p>
                  </div>
                  <div className="hover:bg-[#0e9c49] cursor-pointer hover:text-white p-2 flex items-center">
                    <CloseOutlined />
                    <p className="ml-1" onClick={handleLogout}>
                      Thoát
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(!openCart)}
          >
            <ShoppingCartOutlined className="text-[24px] mx-2 " />
            <div className="absolute border border-[#ccc] rounded-[50%] right-[-4px] top-0 bg-[#009b49]">
              <p className="text-[12px] px-[5px] text-white font-[800]">
                {cart.length ? cart.length : "0"}
              </p>
            </div>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
      </div>
      <div className=" sm:hidden h-[16vh] ">
        <div
          className={`${
            active === true
              ? "shadow-sm fixed top-0 left-0  z-10 w-full bg-white py-2"
              : null
          } transition 800px:flex items-center justify-between w-full cursor-pointer bg-white`}
        >
          <div className="w-full flex justify-between ">
            <div onClick={() => setActiveMobile(!activeMobile)}>
              <HiOutlineMenu className="text-[30px] my-2 mx-4" />
            </div>
            {activeMobile && (
              <div className="w-[70%] shadow z-50 bg-white h-[90vh] fixed top-0 slide-right-animation ">
                <div className="flex relative">
                  <div className=" flex items-center bg-[#0e9c49] w-full h-[10vh]">
                    <div
                      className=" text-white"
                      onClick={() => {
                        navigate("/");
                        setActiveMobile(false);
                      }}
                    >
                      <p className="px-2 py-1 text-[20px] font-[600]">
                        Nông sản xanh
                      </p>
                    </div>
                    <span
                      className="absolute top-[15px] right-0 px-2"
                      onClick={() => setActiveMobile(false)}
                    >
                      <CloseOutlined className="text-white" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col py-2 ">
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/");
                      setActiveMobile(false);
                    }}
                  >
                    Trang chủ
                  </p>
                  {user?.account?.role === "admin" && (
                    <div className="hover:bg-[#0e9c49]  hover:text-white cursor-pointer  flex items-center">
                      <p className="py-2 px-2" onClick={handleNavigateAdmin}>
                        Quản lý
                      </p>
                    </div>
                  )}
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/products");
                      setActiveMobile(false);
                    }}
                  >
                    Sản phẩm
                  </p>
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/best-selling");
                      setActiveMobile(false);
                    }}
                  >
                    Phổ biến
                  </p>
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/events");
                      setActiveMobile(false);
                    }}
                  >
                    Sự kiện
                  </p>
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/faq");
                      setActiveMobile(false);
                    }}
                  >
                    Diễn đàn
                  </p>
                  <p
                    className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                    onClick={() => {
                      navigate("/blog");
                      setActiveMobile(false);
                    }}
                  >
                    Tin tức
                  </p>
                  {user?.isAuthenticated && (
                    <p
                      className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                      onClick={handleNavigateProfile}
                    >
                      Tài khoản
                    </p>
                  )}
                  {user?.isAuthenticated ? null : (
                    <p
                      className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                      onClick={() => {
                        navigate("/login");
                        setActiveMobile(false);
                      }}
                    >
                      Đăng nhập/ đăng kí
                    </p>
                  )}
                  {user?.isAuthenticated && (
                    <p
                      className="hover:bg-[#0e9c49] px-2 hover:text-white cursor-pointer  flex items-center py-2"
                      onClick={() => {
                        handleLogout();
                        setActiveMobile(false);
                      }}
                    >
                      Thoát
                    </p>
                  )}
                </div>
              </div>
            )}
            <div
              className="flex justify-center items-center"
              onClick={() => navigate("/")}
            >
              <p className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0e9c49] to-[#e49200] text-[140%]">
                Nông Nghiệp Xanh
              </p>
            </div>
            <div className="my-3">
              <div className="w-[10px]">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <ShoppingCartOutlined className="text-[30px] absolute right-[16px] " />
                  <div className="absolute border border-[#ccc] rounded-[50%] right-[8px] top-[-4px] bg-[#009b49]">
                    <p className="text-[12px] px-[5px] text-white font-[800]">
                      {cart.length ? cart.length : "0"}
                    </p>
                  </div>
                </div>
              </div>
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            </div>
          </div>
          <div className="py-1 flex justify-center">
            <div
              className={
                show
                  ? "h-[42px]  border bg-[white] items-center flex w-[80%]   rounded-[8px]"
                  : "h-[42px]  border bg-[white] items-center flex w-[80%]   rounded-[8px]"
              }
            >
              <input
                className="h-[30px]  items-center outline-none w-[90%] rounded-l-[8px] px-2 text-[80%] md:text-[100%]"
                placeholder="Nhập tên sản phẩm cần tìm..."
                value={search}
                onChange={handleSearch}
              />
              {searchData && searchData.length !== 0 && search !== "" ? (
                <div className="absolute min-h-[30vh] w-[80%] top-[100px] mt-2 bg-white shadow-md border rounded overflow-y-auto z-20 text-[80%] md:text-[100%]">
                  {searchData.map((item, index) => {
                    return (
                      <Link
                        to={`/product/details/${item._id}`}
                        key={index}
                        onClick={() => setSearch("")}
                      >
                        <div className="w-full flex items-start py-3">
                          <img
                            src={item.images[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h2 className="">{item.name}</h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              <div className="h-full items-center flex justify-center w-[20%]  bg-[#009b49] hover:bg-[#4d8208] rounded-r-[8px] cursor-pointer">
                <SearchOutlined
                  className=" text-white text-[12px] md:text-[24px]"
                  onClick={handleSubmitSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition 800px:flex items-center justify-between w-full`}
      >
        <div
          className={`bg-[#009b49] relative w-full mt-0 shadow-md h-[60px]  items-center  hidden sm:flex `}
        >
          <div className="  h-full  flex items-center pl-o sm:pl-[10%] w-[10%] sm:w-[30%] ">
            <DropdownComponet Text="Danh mục"></DropdownComponet>
          </div>
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
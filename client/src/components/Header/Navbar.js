import { React, useContext, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout'

const Navbar = () => {
  const [dropen, setDropen] = useState(false);

  const history = useNavigate()

  const { account, setAccount } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] =useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(account);

  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true);
  };
  const handledrclose = () => {
    setDropen(false);
  };

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status !== 201) {
      console.log("Error logout");
    } else {
      console.log("data valid");
      alert("log out successful")
      setAccount(false);
      history("/")
    }
  };


  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handledrclose}>
            <Rightheader Logclose={handledrclose} />
          </Drawer>
          <div className="navlogo">
            <Link to="/">
              {" "}
              <img src="./amazon_PNG25.png" alt="" />{" "}
            </Link>
          </div>
          <div className="nav_searchbar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <Link to="/login">Sign Up</Link>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>Cart</p>
          </div>
          {account ? (
            <Avatar className="avtar2"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            >{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            ></Avatar>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account? <MenuItem onClick={handleClose} style={{margin:10}} onClick={logoutuser}><LogoutIcon style={{fontSize:16, marginRight:3}}/>Logout</MenuItem>:""
            }
            
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

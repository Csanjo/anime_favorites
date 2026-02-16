import "./Navbar.css"
import logo from "../assets/logo.png"
import myPage from "../assets/myPagelogo.jpeg"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to={`/`}>
          <img src={ logo } alt="Logo" />
        </Link>
        <span>こんにちはuserさん</span>
        <Link to="/genres" className="banner-link">
          ジャンル一覧
        </Link>
      </div>
      <div className="navbar-right">
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)}>
            <img src={ myPage } alt="" />
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                background: "#000",
                borderRadius: "6px",
                padding: "8px",
                minWidth: "160px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <button
                className="user-info-btn"
                onClick={() => {
                  setOpen(false);
                  navigate("/mypage");
                }}
                style={{ width: "100%" }}
              >
                アカウント情報
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
import "./Navbar.css"
import logo from "../assets/logo.png"
import myPage from "../assets/myPagelogo.jpeg"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  user?: any;
  signOut?: () => void;
};

const Navbar = ({ user, signOut}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const displayName = user?.signInDetails?.loginId || user?.username;

  return (
    <>
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to={`/`}>
          <img src={ logo } alt="Logo" />
        </Link>
        <span>こんにちは{displayName}さん</span>
        <Link to="/genres" className="banner-link">
          ジャンル一覧
        </Link>
      </div>
      <div className="navbar-right">
        <div className="user-icon">
          <button onClick={() => setOpen(!open)}>
            <img src={ myPage } alt="" />
          </button>

          {open && (
            <div className="user-popover">
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
              <button
                className="user-info-btn"
                onClick={signOut}
              >
                ログアウト
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
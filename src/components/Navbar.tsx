import "./Navbar.css"
import logo from "../assets/logo.png"
import myPage from "../assets/myPagelogo.jpeg"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";

type UserAttributes = {
  email?: string;
  given_name?: string;
  family_name?: string;
  nickname?: string;
};

type NavbarProps = {
  user?: any;
  signOut?: () => void;
};

const Navbar = ({ signOut}: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const [familyName, setFamilyName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {

    async function loadUser() {

      try {

        const attributes = await fetchUserAttributes() as UserAttributes;

        setFamilyName(attributes.family_name || "");

      } catch (error) {

        console.error(error);

      }

    }

    loadUser();

  }, []);

  return (
    <>
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to={`/`}>
          <img src={ logo } alt="Logo" />
        </Link>
        <span>こんにちは {familyName}さん</span>
        <Link to="/genres" className="banner-link">
          ジャンル一覧
        </Link>
      </div>
      <div className="navbar-right">
        <div className="user-icon">
          <div onClick={() => setOpen(!open)}>
            <img src={ myPage } alt="" />
          </div>

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
                onClick={() => {
                  setOpen(false);
                  navigate("/myfavorites");
                }}
                style={{ width: "100%" }}
              >
                お気に入り
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
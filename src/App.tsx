import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import AnimeShow from "./pages/AnimeShow";
import GenreShow from "./pages/GenreShow";
import MyPage from "./pages/MyPage";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";


function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (

        <Router>
          <div className="app-container">
            <Navbar user={user} signOut={signOut} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:id" element={<AnimeShow />} />  
                <Route path="/genres" element={<GenreShow/>} />  
                <Route path="/mypage" element={<MyPage/>} />  
              </Routes>
            </main>
            <footer className="footer">
              ©2024 lh
            </footer>
        </div>

        </Router>

      )}
    </Authenticator>
  )
}

export default App

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/authPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { MainPage } from "./pages/main/mainPage";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./pages/auth/protectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { auth, provider } from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./authPage.css";
import { useState } from "react";

export const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState("");

  const resetError = () => {
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered:", user);
            navigate("/profile");
          })
          .catch((error) => {
            setError("You already have an account, Please log in.");
          });
      } else {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            navigate("/profile");
          })
          .catch((error) => {
            setError(
              "Login failed. Invalid Username or Password, Please try again."
            );
          });
      }
    } catch (error) {
      setError("Authentication error. Please try again!");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/profile");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleModeChange = () => {
    resetError();
    setIsRegistering(!isRegistering);
    if (!isRegistering) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="registration-page sign-up">
          <h1>{isRegistering ? "Create account" : "Login"}</h1>
          <form onSubmit={handleFormSubmit}>
            {/* <label>Email address</label> */}
            <input
              className="input-box"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <label>Password</label> */}
            <input
              className="input-box"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn">
              {isRegistering ? "CONTINUE" : "LOGIN"}
            </button>
          </form>
          <p>OR</p>
          <div className="google-reg">
            <button
              className="login-with-google-btn"
              onClick={signInWithGoogle}
            >
              CONTINUE WITH GOOGLE
            </button>

            <div className="logreg-link">
              <p>
                {isRegistering
                  ? "Already registered?"
                  : "Don't have an account?"}
              </p>
              <button onClick={handleModeChange}>
                {isRegistering ? "LOG IN" : "REGISTER"}
              </button>
              {/* <a href="#" className="register-link">
                LOG IN
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { auth, provider } from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./authPage.css";

export const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/profile");
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="registration-page sign-up">
          <h1>Create account</h1>
          <div className="input-box">
            {/* <label>Email address</label> */}
            <input type="text" placeholder="Email address" required />
          </div>
          <div className="input-box">
            {/* <label>Password</label> */}
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn">
            CONTINUE
          </button>
          <p>OR</p>
          <div className="google-reg">
            <button
              className="login-with-google-btn"
              onClick={signInWithGoogle}
            >
              CONTINUE WITH GOOGLE
            </button>

            <div className="logreg-link">
              <p>Already registered?</p>
              <a href="#" className="register-link">
                LOG IN
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

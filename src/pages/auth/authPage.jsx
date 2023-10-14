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
    <div className="wrapper">
      <div className="registration-page">
        <h1>Create Account</h1>
        <div className="input-box">
          <label>Email address</label>
          <input type="text" placeholder="Email address" required />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input type="password" placeholder="Password" required />
        </div>
        <p>Or</p>
        <div className="google-reg">
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

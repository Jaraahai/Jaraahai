import { Link } from "react-router-dom";
import "./mainPage.css";
import Image from "../../img/CS.jpg";

export const MainPage = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${Image})` }}>
      <div className="content">
        <h1>Your most trusted Matchmaking platform!</h1>
        <p>
          Play with over 22 million gamers in leagues, tournaments and ladders
        </p>
        <Link className="nav-link" to={"/auth"}>
          Start Now
        </Link>
      </div>
    </section>
  );
};

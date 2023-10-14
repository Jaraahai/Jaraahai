import { useState } from "react";
import { useAddProfileData } from "../../hooks/useAddProfile";

export const ProfilePage = () => {
  const { profileData } = useAddProfileData();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [rank, setRank] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    profileData({
      name,
      age,
      rank,
    });
  };

  return (
    <div className="profilePage">
      <div className="container">
        <h1>Profile Menu</h1>
        <div className="profileName">
          <h4>Your Name</h4>
          <h4>Your Age</h4>
          <h4>Your Rank</h4>
        </div>
      </div>
      <form className="add-name" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          required
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Rank"
          required
          onChange={(e) => setRank(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

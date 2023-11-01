import React, { useEffect, useState } from "react";
import AuthNavbar from "../../components/AuthNavbar";
import { useAuthState } from "../../hooks/useAuthState";
import { doc, getDoc } from "firebase/firestore";
import { useAddProfileData } from "../../hooks/useAddProfile";
import { useCreateLobby } from "../../hooks/useCreateLobby";

const Dashboard = () => {
  const { user } = useAuthState();
  const { userInfo, db } = useAddProfileData();
  const { createNewLobby } = useCreateLobby();

  const [name, setName] = useState(userInfo.name || "");
  // const [lobbies, setLobbies] = useState([]);
  // const [newLobbies, setNewLobbies] = useState({
  //   name: "",
  //   maxPlayers: 4,
  // });

  async function fetchData() {
    try {
      const res = await getDoc(doc(db, "profile", userInfo.userID));
      if (res.exists()) {
        const userData = res.data(doc);
        setName(userData.name);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Load existing lobbies from Firebase
  useEffect(() => {
    fetchData();

    // Fetch lobbies from Firebase and update 'lobbies' state
  }, []);

  const handleCreateLobby = async () => {
    createNewLobby({
      activePlayers: [], // You can pass any relevant data here
      creator: userInfo.name, // Assuming user has a display name
      lobbyName: "Your Lobby Name",
      maxPlayers: 4, // Set the maximum number of players
    });
  };

  // Join a lobby
  // const joinLobby = (lobbyId, username) => {
  // Update Firebase data to reflect the user's participation in the lobby
  // };
  return (
    <div>
      <AuthNavbar />
      <div>
        {user ? (
          <div className="tw-flex tw-justify-center tw-items-center ">
            <div className="tw-relative tw-w-7/12 tw-h-1/2">
              <div className=" tw-flex tw-flex-col tw-justify-center tw-content-center ">
                <p>Welcome Back, {name}!</p>
                <button
                  className=" tw-px-4 tw-py-2 tw-rounded tw-cursor-pointer tw-text-sm tw-text-white tw-font-semibold tw-bg-[#ff5500]"
                  onClick={handleCreateLobby()}
                >
                  Create Lobby
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Please sign in to create or join lobbies.</p>
        )}
        <h2>Available Lobbies</h2>
        {/* <ul>
          {lobbies.map((lobby) => (
            <li key={lobby.id}>
              {lobby.name} ( Max Players: {lobby.maxPlayers})
              <button onClick={() => joinLobby(lobby.id, user.displayName)}>
                Join
              </button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Dashboard;

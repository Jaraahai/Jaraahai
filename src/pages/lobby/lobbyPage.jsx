import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAddProfileData } from "../../hooks/useAddProfile";

const LobbyPage = () => {
  const { lobbyId } = useParams();
  const { userInfo } = useAddProfileData();
  const navigate = useNavigate();
  const [lobbyData, setLobbyData] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  const handleDeleteLobby = async () => {
    if (userInfo.userID === lobbyData.userID) {
      try {
        await deleteDoc(doc(db, "lobbies", lobbyId));
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting lobby: ", error);
      }
    }
  };

  const handleLeaveLobby = async () => {
    try {
      if (lobbyData.activePlayers.includes(userInfo.userID)) {
        const updatedActivePlayers = lobbyData.activePlayers.filter(
          (userID) => userID !== userInfo.userID
        );

        await setDoc(doc(db, "lobbies", lobbyId), {
          ...lobbyData,
          activePlayers: updatedActivePlayers,
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error leaving lobby: ", error);
    }
  };

  useEffect(() => {
    const fetchLobbyData = async () => {
      try {
        const lobbyDoc = await getDoc(doc(db, "lobbies", lobbyId));
        if (lobbyDoc.exists()) {
          const lobbyInfo = lobbyDoc.data();
          setLobbyData(lobbyInfo);

          const activeUsersData = lobbyInfo.activePlayers || [];
          setActiveUsers(activeUsersData);
        } else {
          console.log("Lobby not found.");
        }
      } catch (error) {
        console.error("Error fetching lobby data:", error);
      }
    };

    fetchLobbyData();
  }, []);

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lobby Name: {lobbyData.lobbyName}</h1>
      <p>Creator: {lobbyData.creator}</p>

      {userInfo.userID === lobbyData.userID && (
        <button className="tw-bg-[#ff0000]" onClick={handleDeleteLobby}>
          Delete Lobby
        </button>
      )}
      {lobbyData.activePlayers.includes(userInfo.userID) && (
        <button className="tw-bg-[#484848]" onClick={handleLeaveLobby}>
          Leave Lobby
        </button>
      )}

      <h1>Active users:</h1>
      <ul>
        {activeUsers.map((userId, index) => (
          <li key={index}>{userId}</li>
        ))}
      </ul>
      {/* Other lobby details to display */}
    </div>
  );
};

export default LobbyPage;

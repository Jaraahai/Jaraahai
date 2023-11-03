import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const LobbyPage = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [lobbyData, setLobbyData] = useState(null);

  const handleLeaveLobby = async () => {
    try {
      await deleteDoc(doc(db, "lobbies", lobbyId));

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
        } else {
          console.log("Lobby not found.");
        }
      } catch (error) {
        console.error("Error fetching lobby data:", error);
      }
    };

    fetchLobbyData();
  }, [lobbyId]);

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lobby Name: {lobbyData.lobbyName}</h1>
      <p>Creator: {lobbyData.creator}</p>

      <button className="tw-bg-[#484848]" onClick={handleLeaveLobby}>
        Leave Lobby
      </button>
      <h1>Active users:</h1>
      {/* Other lobby details to display */}
    </div>
  );
};

export default LobbyPage;

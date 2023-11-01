import { useState } from "react";
import { setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAddProfileData } from "./useAddProfile";

export const useCreateLobby = () => {
  const lobbyRef = collection(db, "lobbies");
  const { userInfo, db } = useAddProfileData();
  //   const [lobbyData, setLobbyData] = useState({
  //     creator: "",
  //     maxPlayers: 10,
  //   });

  const createNewLobby = async () => {
    try {
      const newLobby = {
        ...lobbyData,
        creator: user.uid,
        createdAt: serverTimestamp(),
      };

      await setDoc(lobbyRef, newLobby);

      setLobbyData({
        creator: "",
        maxPlayers: 10,
      });

      alert("Lobby created successfully!");
    } catch (error) {
      console.error("Error creating lobby:", error);
      alert("An error occurred while creating the lobby.");
    }
  };

  return { createNewLobby };
};

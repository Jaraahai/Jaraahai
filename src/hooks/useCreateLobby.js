import { setDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { useAddProfileData } from "./useAddProfile";
import { db } from "../config/firebaseConfig";

export const useCreateLobby = () => {
  const lobbyRef = collection(db, "lobbies");
  const { userInfo } = useAddProfileData();

  const createNewLobby = async (newLobbyData) => {
    try {
      const newLobby = {
        ...newLobbyData,
        creator: userInfo.name,
        createdAt: serverTimestamp(),
        lobbyName: "",
        maxPlayers: 10,
      };

      await setDoc(doc(lobbyRef), newLobby);

      // setLobbyData({
      //   activePlayers: [],
      //   creator: "",
      //   lobbyName: "",
      //   maxPlayers: 10,
      // });

      alert("Lobby created successfully!");
    } catch (error) {
      console.error("Error creating lobby:", error);
      alert("An error occurred while creating the lobby.");
    }
  };

  return { createNewLobby, lobbyRef };
};

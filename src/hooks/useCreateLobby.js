import {
  setDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAddProfileData } from "./useAddProfile";

export const useCreateLobby = () => {
  const lobbyRef = collection(db, "lobbies");
  const { userInfo } = useAddProfileData();
  const { userID } = userInfo;

  const createNewLobby = async ({ lobbyName, maxPlayers }) => {
    try {
      const profileDoc = await getDoc(doc(db, "profile", userID));
      if (profileDoc.exists()) {
        const creatorName = profileDoc.data().name;

        const newLobby = await setDoc(doc(db, "lobbies", userID), {
          userID,
          creator: creatorName,
          lobbyName,
          maxPlayers,
          createdAt: serverTimestamp(),
        });

        // setLobbyData({
        //   activePlayers: [],
        //   creator: "",
        //   lobbyName: "",
        //   maxPlayers: 10,
        // });
        console.log("newLobby: ", newLobby);
        alert("Lobby created successfully!");
      }
    } catch (error) {
      console.error("Error creating lobby:", error);
    }
  };

  return { createNewLobby, lobbyRef, db };
};

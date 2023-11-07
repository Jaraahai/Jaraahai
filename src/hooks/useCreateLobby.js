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
        const creatorRank = profileDoc.data().rank;

        const newLobbyData = await setDoc(doc(db, "lobbies", userID), {
          userID,
          creator: creatorName,
          rank: creatorRank,
          lobbyName,
          maxPlayers,
          activePlayers: [userID],
          createdAt: serverTimestamp(),
        });

        const lobbyDocRef = doc(db, "lobbies", userID);

        await setDoc(lobbyDocRef, newLobbyData, { merge: true });
        console.log("newLobby: ", newLobbyData);
        alert("Lobby created successfully!");
      }
    } catch (error) {
      console.error("Error creating lobby:", error);
    }
  };

  const joinNewLobby = async ({ lobby, userInfo }) => {
    try {
      if (!lobby.activePlayers.includes(userInfo.userID)) {
        lobby.activePlayers.push(userInfo.userID);
        const newLobbyData = await setDoc(
          doc(db, "lobbies", lobby.userID),
          lobby
        );
        console.log("newLobby: ", newLobbyData);
        alert("Lobby joined successfully!");
      } else {
        alert("You're already in this lobby!");
      }
    } catch (error) {
      console.error("Error creating lobby:", error);
    }
  };

  return { createNewLobby, lobbyRef, db, joinNewLobby };
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAddProfileData } from "../../hooks/useAddProfile";
import AuthNavbar from "../../components/AuthNavbar";

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
    <div className="tw-bg-[#161616] tw-min-h-screen tw-text-white">
      <AuthNavbar />
      <div className="tw-contents">
        <div className="tw-py-10">
          <div className="tw-max-w-7xl tw-mx-auto">
            <div className="tw-px-4">
              <div className="tw-flex tw-items-center">
                <div className="tw-flex-auto">
                  <h1 className="tw-text-2xl tw-font-semibold">
                    {lobbyData.creator}'s Lobby
                  </h1>
                </div>
                {userInfo.userID === lobbyData.userID && (
                  <button
                    className="tw-bg-[#ff0000] tw-text-white tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
                    onClick={handleDeleteLobby}
                  >
                    Delete Lobby
                  </button>
                )}
                {lobbyData.activePlayers.includes(userInfo.userID) && (
                  <button
                    className="tw-bg-[#484848] tw-text-white tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
                    onClick={handleLeaveLobby}
                  >
                    Leave Lobby
                  </button>
                )}
              </div>
              <h1 className="tw-mt-8 tw-text-xl tw-font-semibold">
                Active Users:
              </h1>
              <ul className="tw-mt-2">
                {activeUsers.map((userId, index) => (
                  <li key={index} className="tw-text-sm">
                    {userId}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;

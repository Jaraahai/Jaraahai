import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAddProfileData } from "../../hooks/useAddProfile";
import AuthNavbar from "../../components/AuthNavbar";
import profilePic from "../../img/profile.png";

const LobbyPage = () => {
  const { lobbyId } = useParams();
  const { userInfo } = useAddProfileData();
  const navigate = useNavigate();
  const [lobbyData, setLobbyData] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [teamOneUsers, setTeamOneUsers] = useState([]);
  const [teamTwoUsers, setTeamTwoUsers] = useState([]);

  // const [name, setName] = useState(userInfo.name || "");
  // const [rank, setRank] = useState(userInfo.rank || "");
  // const [photoURL, setPhotoURL] = useState(userInfo.photoURL || "");

  const handleDeleteLobby = async () => {
    if (userInfo.userID === lobbyData.userID) {
      try {
        await deleteDoc(doc(db, "lobbies", lobbyId));

        lobbyData.activePlayers.forEach(async (userID) => {
          alert("Lobby creator deleted the lobby.");
        });

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

  const handleMoveToTeamOne = async () => {
    try {
      if (lobbyData.activePlayers.includes(userInfo.userID)) {
        const updatedTeamTwo = (lobbyData.teamTwo || []).filter(
          (userID) => userID !== userInfo.userID
        );

        const updatedTeamOne = lobbyData.teamOne || [];
        updatedTeamOne.push(userInfo.userID);

        await setDoc(doc(db, "lobbies", lobbyId), {
          ...lobbyData,
          teamOne: updatedTeamOne,
          teamTwo: updatedTeamTwo,
        });

        setLobbyData((prevData) => ({
          ...prevData,
          teamOne: updatedTeamOne,
          teamTwo: updatedTeamTwo,
        }));
      }
    } catch (error) {
      console.error("Error moving user to teamOne: ", error);
    }
  };
  const handleMoveToTeamTwo = async () => {
    try {
      if (lobbyData.activePlayers.includes(userInfo.userID)) {
        const updatedTeamOne = (lobbyData.teamOne || []).filter(
          (userID) => userID !== userInfo.userID
        );

        const updatedTeamTwo = lobbyData.teamTwo || [];
        updatedTeamTwo.push(userInfo.userID);

        await setDoc(doc(db, "lobbies", lobbyId), {
          ...lobbyData,
          teamOne: updatedTeamOne,
          teamTwo: updatedTeamTwo,
        });

        setLobbyData((prevData) => ({
          ...prevData,
          teamOne: updatedTeamOne,
          teamTwo: updatedTeamTwo,
        }));
      }
    } catch (error) {
      console.error("Error moving user to teamTwo: ", error);
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
          const activeTeamOneUsersData = lobbyInfo.teamOne || [];
          const activeTeamTwoUsersData = lobbyInfo.teamTwo || [];

          const teamOneUsersPromises = activeTeamOneUsersData.map(
            async (userId) => {
              const userDoc = await getDoc(doc(db, "profile", userId));
              return userDoc.data();
            }
          );

          const teamTwoUsersPromises = activeTeamTwoUsersData.map(
            async (userId) => {
              const userDoc = await getDoc(doc(db, "profile", userId));
              return userDoc.data();
            }
          );

          const usersPromises = activeUsersData.map(async (userId) => {
            const userDoc = await getDoc(doc(db, "profile", userId));
            return userDoc.data();
          });

          const [usersData, teamOneUsersData, teamTwoUsersData] =
            await Promise.all([
              Promise.all(usersPromises),
              Promise.all(teamOneUsersPromises),
              Promise.all(teamTwoUsersPromises),
            ]);
          setTeamOneUsers(teamOneUsersData);
          setTeamTwoUsers(teamTwoUsersData);
          setActiveUsers(usersData);
        } else {
          console.log("Lobby not found.");
        }
      } catch (error) {
        console.error("Error fetching lobby data:", error);
      }
    };

    // async function fetchData() {
    //   const res = await getDoc(doc(db, "profile", userInfo.userID));
    //   if (res.exists()) {
    //     const userData = res.data(doc);
    //     setName(userData.name);
    //     setRank(userData.rank);
    //     setPhotoURL(userData.photoURL);
    //   } else {
    //     console.log("Document does not exist.");
    //   }
    // }
    // fetchData();
    fetchLobbyData();
  }, [lobbyId]);

  if (!lobbyData) {
    return <div>Loading...</div>;
  }

  // const isUserInTeamOne =
  //   lobbyData.teamOne && lobbyData.teamOne.includes(userInfo.userID);
  // const isUserInTeamTwo =
  //   lobbyData.teamTwo && lobbyData.teamTwo.includes(userInfo.userID);

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
                {userInfo.userID !== lobbyData.userID &&
                  lobbyData.activePlayers.includes(userInfo.userID) && (
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
                {activeUsers.map((user, index) => (
                  <li key={index} className="tw-text-sm">
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="tw-bg-[#1a1a1a] tw-text-white/50 tw-flex tw-gap-2 tw-justify-center tw-py-6">
                <div className="tw-flex-initial tw-py-4 tw-pr-0 tw-pl-2 tw-ml-[-8]">
                  <div>
                    <div className="tw-w-80 tw-h-20 tw-bg-[#333] tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-text-xl tw-rounded tw-mx-0 tw-mt-0 tw-mb-2">
                      <button
                        onClick={handleMoveToTeamOne}
                        className="tw-cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    {/* {isUserInTeamOne && */}
                    {teamOneUsers.map((user, index) => (
                      <div
                        key={index}
                        className="tw-w-80 tw-h-20 tw-bg-[#333] tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-text-xl tw-rounded tw-mx-0 tw-mt-0 tw-mb-2"
                      >
                        <div className="tw-flex tw-items-center tw-gap-4 tw-pr-20 tw-tracking-[0.02em] tw-text-sm tw-font-normal tw-leading-5">
                          <br />
                          <img
                            className="tw-h-14 tw-w-14 tw-rounded-full"
                            src={user.photoURL || profilePic}
                            alt=""
                          />
                          <div>
                            <p className="tw-text-white">{user.name}</p>
                            <p className="tw-text-white/50">{user.rank}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tw-flex-initial tw-py-4 tw-px-0 "></div>
                <div className="tw-flex-initial tw-py-4 tw-pr-2 tw-pl-0 tw-mr-[-8]">
                  <div>
                    <div className="tw-w-80 tw-h-20 tw-bg-[#333] tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-text-xl tw-rounded tw-mx-0 tw-mt-0 tw-mb-2">
                      <button
                        onClick={handleMoveToTeamTwo}
                        className="tw-cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    {/* {isUserInTeamTwo && */}
                    {teamTwoUsers.map((user, index) => (
                      <div
                        key={index}
                        className="tw-w-80 tw-h-20 tw-bg-[#333] tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-text-xl tw-rounded tw-mx-0 tw-mt-0 tw-mb-2"
                      >
                        <div className="tw-flex tw-items-center tw-gap-4 tw-pr-20 tw-tracking-[0.02em] tw-text-sm tw-font-normal tw-leading-5">
                          <br />
                          <img
                            className="tw-h-14 tw-w-14 tw-rounded-full"
                            src={user.photoURL || profilePic}
                            alt=""
                          />
                          <div>
                            <p className="tw-text-white">{user.name}</p>
                            <p className="tw-text-white/50">{user.rank}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;

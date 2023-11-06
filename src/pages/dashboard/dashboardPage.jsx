import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../../components/AuthNavbar";
import { useAuthState } from "../../hooks/useAuthState";
import { doc, getDoc, query, onSnapshot } from "firebase/firestore";
import { useAddProfileData } from "../../hooks/useAddProfile";
import { useCreateLobby } from "../../hooks/useCreateLobby";

const Dashboard = () => {
  const { user } = useAuthState();
  const { userInfo, db } = useAddProfileData();
  const { createNewLobby, lobbyRef, joinNewLobby } = useCreateLobby();
  const navigate = useNavigate();

  const [name, setName] = useState(userInfo.name || "");
  const [lobbies, setLobbies] = useState([]);
  const [hasCreatedLobby, setHasCreatedLobby] = useState(false);

  // const isProfileComplete = (userInfo) => {
  //   return userInfo.name && userInfo.age > 0 && userInfo.rank;
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDoc(doc(db, "profile", userInfo.userID));
        if (res.exists()) {
          const userData = res.data();
          setName(userData.name);
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    // Load existing lobbies from Firebase
    fetchData();

    // Fetch lobbies from Firebase and update 'lobbies' state
    const q = query(lobbyRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lobbyList = [];
      let userHasLobby = false;
      snapshot.forEach((doc) => {
        const lobbyData = doc.data();
        lobbyList.push(lobbyData);

        if (lobbyData.userID === userInfo.userID) {
          userHasLobby = true;
        }
      });
      setLobbies(lobbyList);

      setHasCreatedLobby(userHasLobby);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCreateLobby = async () => {
    if (hasCreatedLobby) {
      alert("You already created a lobby.");
      // } else if (!isProfileComplete(userInfo)) {
      //   alert("Please update your profile before creating a lobby.");
    } else {
      const newLobbyData = {
        userID: userInfo.userID,
        creator: userInfo.name,
        rank: userInfo.rank,
        lobbyName: "New Lobby1",
        maxPlayers: 10,
        activePlayers: [],
      };

      try {
        await createNewLobby(newLobbyData);

        navigate(`/lobby/${newLobbyData.userID}`);
      } catch (error) {
        console.error("Error creating lobby: ", error);
      }
    }
  };

  // Join a lobby
  const joinLobby = async (lobby) => {
    console.log("lobby: ", lobby);
    // Update Firebase data to reflect the user's participation in the lobby
    await joinNewLobby({ lobby, userInfo });
    navigate(`/lobby/${lobby.userID}`);
  };

  return (
    <div className="tw-bg-[#161616] tw-min-h-screen tw-text-white">
      <AuthNavbar />
      <div className="tw-contents">
        <div className="tw-py-10">
          <div className="tw-max-w-7xl tw-mx-auto">
            <div className="tw-px-4">
              {user ? (
                <div className="tw-flex tw-items-center">
                  <div className="tw-flex-auto">
                    <p className="tw-leading-6 tw-font-semibold tw-text-base tw-m-0">
                      Welcome Back, {name}!
                    </p>
                    <h2 className="tw-text-sm tw-mt-2 tw-m-0">
                      Available Lobbies
                    </h2>
                  </div>
                  <button
                    className="tw-flex-none tw-mt-0 tw-mr-16 tw-px-3 tw-py-2 tw-rounded-md tw-block tw-cursor-pointer tw-text-sm tw-text-white tw-font-semibold tw-bg-[#ff5500] tw-text-center"
                    onClick={handleCreateLobby}
                  >
                    Create Lobby
                  </button>
                </div>
              ) : (
                <p>Please sign in to create or join lobbies.</p>
              )}

              <div className="tw-flow-root tw-mt-8">
                <div className="tw-mx--6 tw-my--2 tw-overflow-x-auto">
                  <div className="tw-align-middle tw-py-2 tw-min-w-full tw-inline-block">
                    <table className="tw-min-w-full tw-indent-0 tw-border-inherit tw-border-collapse">
                      <thead>
                        <tr>
                          <th className="tw-pl-0 tw-tracking-wide tw-uppercase tw-font-medium tw-text-xs tw-text-left tw-pr-3 tw-py-3">
                            Lobby Name
                          </th>
                          <th className="tw-pl-0 tw-tracking-wide tw-uppercase tw-font-medium tw-text-xs tw-text-left tw-px-3 tw-py-3">
                            Rank
                          </th>
                          <th className="tw-pl-0 tw-tracking-wide tw-uppercase tw-font-medium tw-text-xs tw-text-left tw-px-3 tw-py-3">
                            Max Players
                          </th>
                          {/* <th className="tw-pl-0 tw-tracking-wide tw-uppercase tw-font-medium tw-text-xs tw-text-left tw-px-3 tw-py-3">
                            Lobby Creator
                          </th> */}
                          <th className="tw-pr-0 tw-pl-3 tw-py-3 tw-relative">
                            <span className="tw-sr-only">Join</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {lobbies.map((lobby) => (
                          <tr key={lobby.userID}>
                            <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                              {lobby.lobbyName}
                            </td>
                            <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                              {lobby.rank}
                            </td>
                            <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                              {`${lobby.maxPlayers}/${lobby.maxPlayers}`}
                            </td>
                            <td className="tw-pr-0 tw-text-left tw-relative tw-font-medium tw-text-sm tw-pl-3 tw-py-4 tw-whitespace-nowrap">
                              <button onClick={() => joinLobby(lobby)}>
                                Join
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Dashboard;

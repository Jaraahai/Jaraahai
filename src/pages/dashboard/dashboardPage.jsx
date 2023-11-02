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
      activePlayers: [],
      creator: userInfo.name,
      lobbyName: "Your Lobby Name",
      maxPlayers: 10,
    });
  };

  // Join a lobby
  // const joinLobby = (lobbyId, username) => {
  // Update Firebase data to reflect the user's participation in the lobby
  // };
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
                        <tr>
                          <td className="tw-pl-0 tw-font-medium tw-text-sm tw-pr-3 tw-py-4 tw-whitespace-nowrap">
                            Lobby1
                          </td>
                          <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                            Global Elite
                          </td>
                          {/* <td>Jaraahai</td> */}
                          <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                            7/10
                          </td>
                          <td className="tw-pr-0 tw-text-left tw-relative tw-font-medium tw-text-sm tw-pl-3 tw-py-4 tw-whitespace-nowrap">
                            <a href="#">Join</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="tw-pl-0 tw-font-medium tw-text-sm tw-pr-3 tw-py-4 tw-whitespace-nowrap">
                            Lobby2
                          </td>
                          <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                            Silver
                          </td>
                          {/* <td>Eegii</td> */}
                          <td className="tw-font-medium tw-text-sm tw-px-3 tw-py-4 tw-whitespace-nowrap">
                            3/10
                          </td>
                          <td className="tw-pr-0 tw-text-left tw-relative tw-font-medium tw-text-sm tw-pl-3 tw-py-4 tw-whitespace-nowrap">
                            <a href="#">Join</a>
                          </td>
                        </tr>
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

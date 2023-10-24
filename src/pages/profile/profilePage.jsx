import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAddProfileData } from "../../hooks/useAddProfile";

export const ProfilePage = () => {
  const { saveProfileData, userInfo, docRef, db } = useAddProfileData();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(userInfo.name || "");
  const [age, setAge] = useState(userInfo.age || 0);
  const [rank, setRank] = useState(userInfo.rank || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || "");

  async function fetchData() {
    // try {
    const res = await getDoc(doc(db, "profile", docRef));
    if (res.exists()) {
      console.log("getdoc: ", res.data(doc));
      // const userData = res.data();
      // setName(userData.name);
      // setAge(userData.age);
      // setRank(userData.rank);
      // setPhoneNumber(userData.phoneNumber);
    } else {
      console.log("Document does not exist.");
    }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  }

  // useEffect(() => {
  //   const setProfileList = async () => {
  //     try {
  //       const data = await getDocs(profileCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       console.log(filteredData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   setProfileList();
  // });

  const onSubmit = async (e) => {
    e.preventDefault();
    await saveProfileData({
      userInfo,
      name,
      age,
      rank,
      phoneNumber,
    });
    await fetchData();
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-bg-[#161616] tw-text-white">
      <div className="">
        <h1 className="tw-mb-6 tw-text-3xl tw-font-bold tw-tracking-[0.0025em] tw-leading-8">
          Account Information
        </h1>

        <div className="">
          <div>
            <div className="tw-bg-[#303030] tw-h-px tw-min-h-px"></div>
            <div className="account-security">
              <h1 className="tw-py-6 tw-text-2xl tw-font-bold tw-tracking-[0.005em] tw-leading-7">
                Account Security
              </h1>
              <div className="tw-py-4">
                <h2 className="tw-text-base tw-font-bold tw-tracking-[0.005em] tw-leading-5">
                  Password
                </h2>
                <p className="tw-pt-2 tw-text-sm tw-font-normal tw-leading-5">
                  ********
                </p>
              </div>
              <div className="tw-bg-[#303030] tw-h-px tw-min-h-px"></div>
              <div className="tw-py-4">
                <h2 className="tw-text-base tw-font-bold tw-tracking-[0.005em] tw-leading-5">
                  Phone number
                </h2>
                <p className="tw-pt-2 tw-text-sm tw-font-normal tw-leading-5">
                  {userInfo.phoneNumber}
                </p>
              </div>
            </div>

            <div className="personal-details">
              <h1 className="tw-py-6 tw-text-2xl tw-font-bold tw-tracking-[0.005em] tw-leading-7">
                Personal Details
              </h1>
              <div className="tw-py-4">
                <h2 className="tw-text-base tw-font-bold tw-tracking-[0.005em] tw-leading-5">
                  Name
                </h2>
                <p className="tw-pt-2 tw-text-sm tw-font-normal tw-leading-5">
                  {userInfo.name}
                </p>
              </div>
              <div className="tw-bg-[#303030] tw-h-px tw-min-h-px"></div>
              <div className="tw-py-4">
                <h2 className="tw-text-base tw-font-bold tw-tracking-[0.005em] tw-leading-5">
                  Age
                </h2>
                <p className="tw-pt-2 tw-text-sm tw-font-normal tw-leading-5">
                  {userInfo.age}
                </p>
              </div>
              <div className="tw-bg-[#303030] tw-h-px tw-min-h-px"></div>
              <div className="tw-py-4">
                <h2 className="tw-text-base tw-font-bold tw-tracking-[0.005em] tw-leading-5">
                  Rank
                </h2>
                <p className="tw-pt-2 tw-text-sm tw-font-normal tw-leading-5">
                  {userInfo.rank}
                </p>
              </div>
              <div className="tw-bg-[#303030] tw-h-px tw-min-h-px"></div>
            </div>
          </div>
          <div>
            <button
              className="tw-outline-none tw-whitespace-nowrap tw-box-border tw-rounded tw-h-8 tw-w-auto tw-text-m tw-font-bold tw-uppercase tw-text-[#ff5500] tw-bg-transparent tw-border-none tw-py-2"
              onClick={toggleEditing}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div>
            {isEditing ? (
              <form
                onSubmit={onSubmit}
                className="  tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4"
              >
                <div className="tw-mb-4">
                  <label
                    className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
                    htmlFor="username"
                  >
                    Your name
                  </label>
                  <input
                    className="tw-shadow  tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-white tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                    id="username"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="tw-mb-4">
                  <label
                    className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
                    htmlFor="age"
                  >
                    Your age
                  </label>
                  <input
                    className="tw-shadow tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-white tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                    id="age"
                    value={age}
                    onChange={(e) => {
                      setAge(Number(e.target.value));
                    }}
                    type="text"
                    placeholder="Age"
                  />
                </div>
                <div className="tw-mb-4">
                  <label
                    className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
                    htmlFor="rank"
                  >
                    Your rank
                  </label>
                  <input
                    className="tw-shadow  tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-white tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                    id="rank"
                    value={rank}
                    onChange={(e) => {
                      setRank(e.target.value);
                    }}
                    type="text"
                    placeholder="Rank"
                  />
                </div>
                <div className="tw-mb-4">
                  <label
                    className="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2"
                    htmlFor="username"
                  >
                    Your rank
                  </label>
                  <input
                    className="tw-shadow  tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-white tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(Number(e.target.value));
                    }}
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <button
                    className="tw-bg-[#ff5500]  tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

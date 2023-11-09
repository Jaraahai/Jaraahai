import { collection, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddProfileData = () => {
  const profileCollectionRef = collection(db, "profile");
  const userInfo = useGetUserInfo();
  const { userID } = userInfo;

  // console.log("userInfo: ", userInfo);

  const saveProfileData = async ({
    name,
    age,
    rank,
    phoneNumber,
    photoURL,
  }) => {
    try {
      const res = await setDoc(doc(db, "profile", userID), {
        userID,
        name,
        age,
        rank,
        phoneNumber,
        photoURL,
        createdAt: serverTimestamp(),
      });

      console.log("res: ", res);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return { saveProfileData, userInfo, profileCollectionRef, db };
};

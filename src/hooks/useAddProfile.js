import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";
import { useState } from "react";
export const useAddProfileData = () => {
  const profileCollectionRef = collection(db, "profile");
  const userInfo = useGetUserInfo();
  const { userID } = userInfo;
  const [docRef, setDocRef] = useState("");

  console.log("userInfo: ", userInfo);

  const saveProfileData = async ({ name, age, rank, phoneNumber }) => {
    try {
      const res = await addDoc(profileCollectionRef, {
        userID,
        name,
        age,
        rank,
        phoneNumber,
        createdAt: serverTimestamp(),
      });
      console.log("res: ", res);
      setDocRef(res.id);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return { saveProfileData, userInfo, profileCollectionRef, docRef, db };
};

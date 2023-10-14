import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";
export const useAddProfileData = () => {
  const profileCollectionRef = collection(db, "profile");
  const { userID } = useGetUserInfo();

  const profileData = async ({ name, age, rank }) => {
    await addDoc(profileCollectionRef, {
      userID,
      name,
      age,
      rank,
      createdAt: serverTimestamp(),
    });
  };
  return { profileData };
};

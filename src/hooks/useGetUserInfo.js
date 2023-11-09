export const useGetUserInfo = () => {
  const { name, rank, age, phoneNumber, photoURL, userID, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );
  return { name, rank, age, phoneNumber, photoURL, userID, isAuth };
};

export const useGetUserInfo = () => {
  const { name, rank, age, phoneNumber, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth"));
  return { name, rank, age, phoneNumber, profilePhoto, userID, isAuth };
};

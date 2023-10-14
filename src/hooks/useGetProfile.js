import { useState } from "react";

export const useGetProfile = () => {
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {};
  return { profile };
};

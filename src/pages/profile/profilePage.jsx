import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useAddProfileData } from "../../hooks/useAddProfile";

export const ProfilePage = () => {
  const { saveProfileData, userInfo, docRef, db } = useAddProfileData();


  async function fetchData() {
    const res = await getDoc(doc(db, 'profile', docRef));
    console.log('getdoc: ', res.data());

  }

  const [name, setName] = useState(userInfo.name);
  const [age, setAge] = useState(18);
  const [rank, setRank] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await saveProfileData({
      name,
      age,
      rank,
    });
    await fetchData();
  };

  return (
    <div className="profilePage">
      <div className="container">
        {/* <h1>Profile Menu</h1>
        <div className="profileName">
          <h4>Your Name</h4>
          <h4>Your Age</h4>
          <h4>Your Rank</h4>
        </div> */}

    <div class="w-full max-w-xs">
    <form onSubmit={onSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Your name
        </label>
        <input 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          type="text"
          placeholder="Username"/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Your age
        </label>
        <input 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
          }}
          type='number'
          placeholder="age"/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Your rank
        </label>
        <input 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rank"
          value={rank}
          onChange={(e) => {
            setRank(e.target.value)
          }}
          type='text'
          placeholder="rank"/>
      </div>
      <div class="flex items-center justify-between">
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          
          >
          Save
        </button>
      </div>
    </form>
</div>
</div>

    </div>
  );
};

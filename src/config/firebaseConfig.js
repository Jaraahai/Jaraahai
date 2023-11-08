import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPGfUnGw24Any0LsFdXEkaLSZ-I8WsfUU",
  authDomain: "jaraahai-mn.firebaseapp.com",
  projectId: "jaraahai-mn",
  storageBucket: "jaraahai-mn.appspot.com",
  messagingSenderId: "193384316834",
  appId: "1:193384316834:web:53362e586210b165e97cfb",
  measurementId: "G-CEPDZTJSZY",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted");
//       const messaging = getMessaging(app);
//       getToken(messaging, {
//         vapidKey:
//           "BHaL_oDKZHniNzKovYE1xzP63GN5KH_Ls0HWZrX8aFaqOGQOfKq_04t7vNVQwGB859uhbR_YEQvW3OnYRCJcutY",
//       }).then((currentToken) => {
//         if (currentToken) {
//           console.log("currentToken: ", currentToken);
//         } else {
//           console.log("Can't get token");
//         }
//       });
//     } else {
//       console.log("Don't have permission!");
//     }
//   });
// }

// requestPermission();

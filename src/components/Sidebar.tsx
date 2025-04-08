//import useUserInfo from "@/hooks/useUserInfo";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { Loader2, LogOut, Search } from "lucide-react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // à importer
//import Avatar from "./Avatar";

export default function Sidebar() {
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [connectedUser, setConnectedUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  //const {userInfo} =  useUserInfo()
  async function Loggout() {
    try {
      setLoggingOut(true);
      await auth.signOut();
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    } finally {
      setLoggingOut(false);
    }
  }

  //recupere le user connectee
  const [userData, setUserData] = useState<any>(null); // infos Firestore

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setConnectedUser(user); // ceci reste du type Firebase User
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data()); // infos supplémentaires
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log(userData);
  //console.log(userInfo)
  return (
    <div className=" block  w-96 border-r border-[#2f3336] text-xl font-lg text-white  pr-3">
      <div className="top-4 sticky">
        <Link
          to="/"
          className="mt-2 pl-2"
        >
          <span className="h-11 inline-flex items-center hover:bg-zinc-700 w-auto  rounded-full">
            <img
              src={"/icons/icon_twitter.png"}
              className="mx-1 w-10 h-10  "
              alt=""
            />
          </span>
        </Link>

        <div className=" mt-4 ">
          <Link
            to="/"
            className="block p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_home.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Home
            </span>
          </Link>

          <Link
            to={`/users`}
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
            <Search className="ml-1 mr-3" />

find Users            </span>
          </Link>

          <Link
            to="/"
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_3dots.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              More
            </span>
          </Link>
        </div>
        

        <div className="flex items-center border-[#2f3336] border py-2 px-2 rounded-full w-64 text-base ml-auto mr-3  mt-12 fixed bottom-3 ">
          <img
            className=" w-12 h-12 mr-2  "
            src={"./icons/user.svg"}
            alt=""
          />
          <div className=" flex-col items-center">
            {" "}
            <strong>{userData?.fullname} </strong> <br></br>
            <span className="text-twitterLightGray">
              {" "}
              @{userData?.username}
            </span>{" "}
          </div>
          <button
            className="ml-auto mr-9 w-5 h-5"
            onClick={Loggout}
          >
            <LogOut className="size-5 hover:text-zinc-700"  />
          </button>
        </div>
      </div>
    </div>
  );
}

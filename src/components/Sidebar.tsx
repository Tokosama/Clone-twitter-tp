//import useUserInfo from "@/hooks/useUserInfo";
import React from "react";
import { Link } from "react-router-dom";
//import Avatar from "./Avatar";

export default function Sidebar() {
  //const {userInfo} =  useUserInfo()

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
          {/* <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_search.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Exploration
            </span>
          </Link>
          <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_notification.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Notifications
            </span>
          </Link>

          <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_mail.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Messages
            </span>
          </Link>

          <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_list.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Lists
            </span>
          </Link>

          <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_bookmark.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Bookmarks
            </span>
          </Link>

          <Link
            to=""
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_verified.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Verified
            </span>
          </Link> */}

          <Link
            to={`/users`}
            className="block my-2 p-1"
          >
            <span className="h-11 inline-flex  items-center hover:bg-zinc-700 w-auto p-4 rounded-3xl">
              <img
                src={"/icons/icon_profile.svg"}
                className="mr-3 w-7 h-7  "
                alt=""
              />
              Profile
            </span>
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
        <button className="w-56 my-3 bg-blue-400  rounded-full h-12 ">
          Tweet
        </button>

        {/* <div className="flex items-center w-56 text-base ml-auto mr-3  mt-12 fixed bottom-3 ">
         <Avatar src={userInfo?.image} />
          <div className=" flex-col items-center">
            {" "}
            <strong>{userInfo?.name} </strong> <br></br><span className="text-twitterLightGray"> @{userInfo?.username}</span>{" "}
          </div>
          <img
            src={"/icons/icon_3dots.svg"}
            className="ml-auto w-5 h-5  "
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
}

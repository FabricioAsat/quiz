import showImage from "../assets/svg/open.svg";
import incognitoImage from "../assets/svg/incognito.svg";
import playImage from "../assets/svg/play.svg";
import searchImage from "../assets/svg/search.svg";

import { useState } from "react";

const exampleUser: TUser[] = [
  {
    id: "asdasdasdasd",
    username: "asdasdsad",
    email: "adasdasdasd",
    password: "adsasdasd",
    isActive: true,
  },
  {
    id: "qwewqeewqeqw",
    username: "qwewqeewqeqw",
    email: "wqeewqewq",
    password: "wqeewqewqqew",
    isActive: true,
  },
  {
    id: "rtyrtyrty",
    username: "rtyrtyrtyr",
    email: "ryrtyrty",
    password: "rtyrtyrty",
    isActive: true,
  },
  {
    id: "iopiopiopiop",
    username: "iopiopiopoi",
    email: "iopiopiopiop",
    password: "iopiopiopiop",
    isActive: true,
  },
  {
    id: "asdasdasdasd",
    username: "asdasdsad",
    email: "adasdasdasd",
    password: "adsasdasd",
    isActive: true,
  },
  {
    id: "qwewqeewqeqw",
    username: "qwewqeewqeqw",
    email: "wqeewqewq",
    password: "wqeewqewqqew",
    isActive: true,
  },
  {
    id: "rtyrtyrty",
    username: "rtyrtyrtyr",
    email: "ryrtyrty",
    password: "rtyrtyrty",
    isActive: true,
  },
  {
    id: "iopiopiopiop",
    username: "iopiopiopoi",
    email: "iopiopiopiop",
    password: "iopiopiopiop",
    isActive: true,
  },
  {
    id: "asdasdasdasd",
    username: "asdasdsad",
    email: "adasdasdasd",
    password: "adsasdasd",
    isActive: true,
  },
  {
    id: "qwewqeewqeqw",
    username: "qwewqeewqeqw",
    email: "wqeewqewq",
    password: "wqeewqewqqew",
    isActive: true,
  },
  {
    id: "rtyrtyrty",
    username: "rtyrtyrtyr",
    email: "ryrtyrty",
    password: "rtyrtyrty",
    isActive: true,
  },
  {
    id: "iopiopiopiop",
    username: "iopiopiopoi",
    email: "iopiopiopiop",
    password: "iopiopiopiop",
    isActive: true,
  },
  {
    id: "asdasdasdasd",
    username: "asdasdsad",
    email: "adasdasdasd",
    password: "adsasdasd",
    isActive: true,
  },
  {
    id: "qwewqeewqeqw",
    username: "qwewqeewqeqw",
    email: "wqeewqewq",
    password: "wqeewqewqqew",
    isActive: true,
  },
  {
    id: "rtyrtyrty",
    username: "rtyrtyrtyr",
    email: "ryrtyrty",
    password: "rtyrtyrty",
    isActive: true,
  },
  {
    id: "iopiopiopiop",
    username: "iopiopiopoi",
    email: "iopiopiopiop",
    password: "iopiopiopiop",
    isActive: true,
  },
];

export const UserInfoHome = ({
  currentUser,
  setShowUserInfo,
  showUserInfo,
}: {
  currentUser: TUser;
  showUserInfo: boolean;
  setShowUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [allUsersActives] = useState<TUser[]>(exampleUser);
  const [filterUsers, setFilterUsers] = useState<TUser[]>(allUsersActives);
  const [inputValue, setInputValue] = useState("");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setFilterUsers(allUsersActives.filter((user) => user.username.includes(e.target.value)));
  }

  return (
    <div className="flex flex-col items-center h-full max-h-screen">
      <section className="flex items-center w-full py-5 pl-5 pr-2 bg-b-primary">
        <img src={incognitoImage} alt="User image" className="w-10 h-10" />
        <span className="flex flex-col items-start justify-center w-full h-full pl-3">
          <h3 className="font-bold truncate">{currentUser.username}</h3>
          <i className="text-xs truncate text-t-primary/50">{currentUser.id}</i>
        </span>
        <button
          onClick={() => setShowUserInfo(!showUserInfo)}
          className={`z-50 top-4 transition-all duration-500 sm:hidden ${
            showUserInfo ? "scale-x-[-1] translate-x-0" : "translate-x-16"
          }`}
        >
          <img src={showImage} alt="Open" className="w-10 h-10" />
        </button>
      </section>

      <div className="flex items-center w-full px-5 py-2 mb-3 bg-b-primary">
        <input
          type="text"
          name="browser"
          id="browser"
          value={inputValue}
          onChange={handleOnChange}
          placeholder="Search player"
          className="w-full p-2 bg-transparent border-b outline-none placeholder:italic"
        />
        <button>
          <img src={searchImage} alt="Search image" className="w-10 h-10 scale-x-[-1] border-b" />
        </button>
      </div>

      <section className="flex flex-col w-full h-full overflow-y-auto m t-5">
        {filterUsers.map((user) => (
          <section className="flex items-center w-full px-5 py-5 transition-colors duration-500 hover:bg-b-primary/50">
            <img src={incognitoImage} alt="User image" className="w-10 h-10" />
            <span className="flex flex-col items-start justify-center w-full h-full pl-3">
              <h3 className="font-bold truncate">{user.username}</h3>
              <i className="text-xs truncate text-t-primary/50">{user.id}</i>
            </span>
            <button title={`Play whit ${user.username}`} className="px-2 py-1 border rounded-lg">
              <img src={playImage} alt="Play icon" className="w-6 h-6" />
            </button>
          </section>
        ))}
      </section>
    </div>
  );
};

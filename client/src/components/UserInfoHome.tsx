import showImage from "../assets/svg/open.svg";
import incognitoImage from "../assets/svg/incognito.svg";
import playImage from "../assets/svg/play.svg";
import searchImage from "../assets/svg/search.svg";
import errorImage from "../assets/svg/error.svg";

import { useEffect, useState } from "react";
import { getActiveUsers } from "../api/userReq";
import { toast } from "sonner";

export const UserInfoHome = ({
  currentUser,
  setShowUserInfo,
  showUserInfo,
}: {
  currentUser: TUser;
  showUserInfo: boolean;
  setShowUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [allUsersActives, setAllUsersActives] = useState<TUser[]>([]);
  const [filterUsers, setFilterUsers] = useState<TUser[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [waitingResponse, setwaitingResponse] = useState(true);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setFilterUsers(allUsersActives.filter((user) => user.Username.includes(e.target.value)));
  }

  useEffect(() => {
    if (!currentUser.ID) return;
    setwaitingResponse(true);
    async function request() {
      const response = await getActiveUsers();
      setwaitingResponse(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      const auxUsers = response.data as TUser[];
      const filterCurrentUser = auxUsers.filter((user: TUser) => user.ID !== currentUser.ID);
      setAllUsersActives(filterCurrentUser);
      setFilterUsers(filterCurrentUser);
    }
    request();
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center h-full max-h-screen">
      <section className="flex items-center w-full py-5 pl-5 pr-2 bg-b-primary">
        <img src={incognitoImage} alt="User image" className="w-10 h-10" />
        <span className="flex flex-col items-start justify-center w-full h-full pl-3">
          <h3 className="font-bold truncate">{currentUser.Username}</h3>
          <i className="text-xs truncate text-t-primary/50">{currentUser.ID}</i>
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

      <div className="w-full px-5 py-2 mb-3 gap-x-0 bg-b-primary">
        <span className="flex items-center w-full border-b">
          <label htmlFor="browser" className="h-full">
            <img src={searchImage} alt="Search image" className="w-10 h-10 scale-x-[-1]" />
          </label>
          <input
            type="text"
            name="browser"
            id="browser"
            value={inputValue}
            onChange={handleOnChange}
            placeholder="Search player"
            className="w-full h-full px-2 bg-transparent outline-none placeholder:italic"
          />
        </span>
      </div>

      {waitingResponse ? (
        <div className="flex flex-col items-center gap-y-3">
          <div className="w-10 h-10 mt-10 border-2 border-transparent rounded-full border-b-green-500 animate-spin"></div>
          <p className="italic">Searching for active users...</p>
        </div>
      ) : (
        <section className="flex flex-col w-full h-full overflow-y-auto m t-5">
          {filterUsers.length > 0 ? (
            filterUsers.map((user) => (
              <section
                key={user.ID}
                className="flex items-center w-full px-5 py-5 transition-colors duration-500 hover:bg-b-primary/50"
              >
                <img src={incognitoImage} alt="User image" className="w-10 h-10" />
                <span className="flex flex-col items-start justify-center w-full h-full pl-3">
                  <h3 className="font-bold truncate">{user.Username}</h3>
                  <i className="text-xs truncate text-t-primary/50">{user.ID}</i>
                </span>
                <button title={`Play whit ${user.Username}`} className="px-2 py-1 border rounded-lg">
                  <img src={playImage} alt="Play icon" className="w-6 h-6" />
                </button>
              </section>
            ))
          ) : (
            <section className="flex flex-col items-center justify-center w-full h-full gap-y-5">
              <img src={errorImage} alt="User image" className="w-24 h-24" />
              <h3 className="text-3xl font-bold truncate">No active players</h3>
            </section>
          )}
        </section>
      )}
    </div>
  );
};

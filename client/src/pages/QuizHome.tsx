import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserInfoHome } from "../components/UserInfoHome";
import { NotPlaying } from "../components/NotPlaying";
import { MESSAGES_WS } from "../utils/messagesConstants";
import { Playing } from "../components/Playing";

const initialUserInfo: TUser = {
  ID: "",
  Username: "",
  Email: "",
  Password: "",
  IsActive: false,
};

export const QuizHome = () => {
  const [currentUser, setCurrentUser] = useState<TUser>(initialUserInfo);
  const [versusUser, setVersusUser] = useState<TUser>(initialUserInfo);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigateTo = useNavigate();

  //! Conección WebSocket
  const [messageWS, setMessageWS] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("current-user")) navigateTo("/login");
    setCurrentUser(JSON.parse(localStorage.getItem("current-user")!));

    if (!currentUser.ID) return;
    const socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}/${currentUser.ID}`);

    socket.onmessage = function (event) {
      console.log(event.data);
      setMessageWS(event.data); // Muestra el mensaje recibido
    };

    return () => {
      socket.close(); // Cierra la conexión cuando el componente se desmonta
    };
  }, [currentUser.ID]);

  useEffect(() => {
    if (!messageWS) return;

    switch (true) {
      case messageWS.startsWith(MESSAGES_WS.LOGIN):
        setIsRefresh(true);
        toast.info(messageWS.replace(MESSAGES_WS.LOGIN, "") + " has connected");
        break;
      case messageWS.startsWith(MESSAGES_WS.LOGOUT):
        setIsRefresh(true);
        break;
    }
  }, [messageWS]);
  //! ---------------------------------------------------------------

  return (
    <section className="flex w-screen h-screen">
      <div
        className={`fixed top-0 w-full h-full bg-b-primary/85 sm:bg-b-primary/50 sm:max-w-96 sm:static ${
          showUserInfo ? "left-0" : "-left-full sm:left-0"
        }`}
      >
        <UserInfoHome
          currentUser={currentUser}
          setShowUserInfo={setShowUserInfo}
          showUserInfo={showUserInfo}
          setIsRefresh={setIsRefresh}
          isRefresh={isRefresh}
        />
      </div>
      <button onClick={() => setIsPlaying(!isPlaying)} className="absolute bottom-0 left-0 px-2 py-1 bg-red-600">
        Play
      </button>

      {isPlaying ? <Playing versusUser={versusUser} /> : <NotPlaying />}
    </section>
  );
};

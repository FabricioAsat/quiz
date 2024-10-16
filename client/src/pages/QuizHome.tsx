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

  const [incomingChallenge, setIncomingChallenge] = useState<boolean>(false); // Guardar reto entrante

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

  //*: Effect - Decide que hacer dependiendo el mensaje
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
      case messageWS.startsWith(MESSAGES_WS.CHALLENGE):
        setIncomingChallenge(true);
        break;
      case messageWS.startsWith(MESSAGES_WS.ACCEPT):
        setIncomingChallenge(false);
        setIsPlaying(true);
        setShowUserInfo(false);
        break;
      case messageWS.startsWith(MESSAGES_WS.REJECT):
        setIncomingChallenge(false);
        setIsPlaying(false);
        break;
      default:
        console.log(messageWS);
    }
  }, [messageWS]);
  //! ---------------------------------------------------------------

  return (
    <section className="flex w-screen h-screen">
      <div
        className={`fixed z-40 top-0 w-full h-full bg-b-primary/85 sm:bg-b-primary/50 sm:max-w-96 sm:static ${
          showUserInfo ? "left-0" : "-left-full sm:left-0"
        }`}
      >
        <UserInfoHome
          currentUser={currentUser}
          setShowUserInfo={setShowUserInfo}
          showUserInfo={showUserInfo}
          setIsRefresh={setIsRefresh}
          isRefresh={isRefresh}
          setVersusUser={setVersusUser}
          isPlaying={isPlaying}
        />
      </div>

      {isPlaying ? (
        <Playing versusUser={versusUser} currentUser={currentUser} />
      ) : (
        <NotPlaying
          versusUser={versusUser}
          currentUser={currentUser}
          incomingChallenge={incomingChallenge}
          setIncomingChallenge={setIncomingChallenge}
        />
      )}
    </section>
  );
};

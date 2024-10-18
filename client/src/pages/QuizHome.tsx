import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserInfoHome } from "../components/UserInfoHome";
import { NotPlaying } from "../components/NotPlaying";
import { MESSAGES_WS } from "../utils/messagesConstants";
import { Playing } from "../components/Playing";
import { postStartQuiz } from "../api/challengeReq";

const initialUserInfo: TUser = {
  ID: "",
  Username: "",
  Email: "",
  Password: "",
  IsActive: false,
};
const initialUserResult: TUserResult = {
  PlayerID: "",
  Corrects: 0,
  Wrongs: 0,
  Time: 0,
};

export const QuizHome = () => {
  const [allQuestions, setAllQuestions] = useState<TQuestion[]>([]);
  const [allUsersActives, setAllUsersActives] = useState<TUser[]>([]);
  const [currentUser, setCurrentUser] = useState<TUser>(initialUserInfo);
  const [versusUser, setVersusUser] = useState<TUser>(initialUserInfo);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGameId, setCurrentGameId] = useState("");
  const [incomingChallenge, setIncomingChallenge] = useState<boolean>(false); // Guardar reto entrante
  const [currentOpponentProgress, setCurrentOpponentProgress] = useState(0);
  const [oponentResutls, setOponentResutls] = useState<TUserResult>(initialUserResult);

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
        switchHandlerLogin();
        break;
      case messageWS.startsWith(MESSAGES_WS.LOGOUT):
        switchHandlerLogout();
        break;
      case messageWS.startsWith(MESSAGES_WS.CHALLENGE):
        switchHandlerChallenge();
        break;
      case messageWS.startsWith(MESSAGES_WS.ACCEPT):
        switchHandlerAccept();
        break;
      case messageWS.startsWith(MESSAGES_WS.REJECT):
        switchHandlerReject();
        break;
      case messageWS.startsWith(MESSAGES_WS.QUESTIONS):
        switchHandlerQuestions();
        break;
      case messageWS.startsWith(MESSAGES_WS.PROGRESS):
        switchHandlerProgress();
        break;
      case messageWS.startsWith(MESSAGES_WS.RESULTS):
        switchHandlerResults();
        break;
      default:
    }
  }, [messageWS]);
  //! ---------------------------------------------------------------

  function switchHandlerLogin() {
    setIsRefresh(true);
    toast.info(messageWS.replace(MESSAGES_WS.LOGIN, "") + " has connected");
  }
  function switchHandlerLogout() {
    setIsRefresh(true);
  }
  function switchHandlerChallenge() {
    setIncomingChallenge(true);
    const uuid = messageWS.match(/User: (\w+)/)?.[1];
    setVersusUser(allUsersActives.find((user) => user.ID === uuid)!);
  }
  function switchHandlerAccept() {
    setIncomingChallenge(false);
    setShowUserInfo(false);
    setIsPlaying(true);
    async function request() {
      const combined = currentUser.ID + versusUser.ID;
      const gameId = btoa(combined);
      setCurrentGameId(gameId);
      const response = await postStartQuiz(gameId, [currentUser.ID, versusUser.ID]);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success("Start Quiz");
    }
    request();
  }
  function switchHandlerReject() {
    setIncomingChallenge(false);
    setIsPlaying(false);
    setVersusUser(initialUserInfo);
  }
  function switchHandlerQuestions() {
    setAllQuestions(JSON.parse(messageWS.replace(MESSAGES_WS.QUESTIONS, "")));
  }
  function switchHandlerProgress() {
    setCurrentOpponentProgress(Number(messageWS.replace(MESSAGES_WS.PROGRESS, "")));
  }
  function switchHandlerResults() {
    const jsonResult = messageWS.replace(MESSAGES_WS.RESULTS, "");
    setOponentResutls(JSON.parse(jsonResult));
  }

  function handleReset() {
    setCurrentUser(initialUserInfo);
    setVersusUser(initialUserInfo);
    setOponentResutls(initialUserResult);
    setIsPlaying(false);
    setCurrentGameId("");
    setCurrentOpponentProgress(0);
    setAllUsersActives([]);
    setIncomingChallenge(false);
    setAllQuestions([]);
    setShowUserInfo(false);
  }

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
          allUsersActives={allUsersActives}
          setAllUsersActives={setAllUsersActives}
        />
      </div>

      {isPlaying ? (
        <Playing
          versusUser={versusUser}
          currentUser={currentUser}
          allQuestions={allQuestions}
          gameId={currentGameId}
          currentOpponentProgress={currentOpponentProgress}
          handleReset={handleReset}
          oponentResutls={oponentResutls}
        />
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

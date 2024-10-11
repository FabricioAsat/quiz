import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserInfoHome } from "../components/UserInfoHome";

const initialUserInfo: TUser = {
  ID: "",
  Username: "",
  Email: "",
  Password: "",
  IsActive: false,
};

export const QuizHome = () => {
  const [currentUser, setCurrentUser] = useState<TUser>(initialUserInfo);
  const [showUserInfo, setShowUserInfo] = useState(true);

  const navigateTo = useNavigate();

  //! Conección WebSocket
  const [messageWS, setMessageWS] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("current-user")) navigateTo("/login");
    setCurrentUser(JSON.parse(localStorage.getItem("current-user")!));

    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onmessage = function (event) {
      console.log("Mensaje del servidor:", event.data);
      setMessageWS(event.data); // Muestra el mensaje recibido
    };

    return () => {
      socket.close(); // Cierra la conexión cuando el componente se desmonta
    };
  }, []);
  useEffect(() => {
    if (!messageWS) return;
    toast.info(messageWS);
  }, [messageWS]);
  //! ---------------------------------------------------------------

  return (
    <section className="flex w-screen h-screen">
      <div
        className={`fixed top-0 w-full h-full bg-b-primary/50 sm:max-w-96 sm:static ${
          showUserInfo ? "left-0" : "-left-full sm:left-0"
        }`}
      >
        <UserInfoHome currentUser={currentUser} setShowUserInfo={setShowUserInfo} showUserInfo={showUserInfo} />
      </div>

      <div className="flex items-center justify-center w-full">
        <h2 className="text-3xl font-bold text-center">El juego irá aquí</h2>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const QuizHome = () => {
  //! ---------------------------------------------------------------
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onmessage = function (event) {
      console.log("Mensaje del servidor:", event.data);
      setMessage(event.data); // Muestra el mensaje recibido
    };

    return () => {
      socket.close(); // Cierra la conexión cuando el componente se desmonta
    };
  }, []);

  useEffect(() => {
    if (!message) return;
    toast.info(message);
  }, [message]);
  //! ---------------------------------------------------------------

  return (
    <div className="flex gap-x-6">
      <Link to={"/register"} className="px-4 py-2 text-xl font-bold rounded-md bg-b-primary text-t-primary">
        Registrarse
      </Link>
      <Link to={"/login"} className="px-4 py-2 text-xl font-bold rounded-md bg-b-primary text-t-primary">
        Logearse
      </Link>
    </div>
  );
};

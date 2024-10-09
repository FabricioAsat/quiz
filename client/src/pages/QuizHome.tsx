import { Link } from "react-router-dom";

export const QuizHome = () => {
  return (
    <div className="flex gap-x-6">
      <Link to={"/register"} className="px-4 py-2 text-xl font-bold rounded-md bg-b-primary text-t-primary">
        Registrarse
      </Link>
      <Link to={"/login"} className="px-4 py-2 text-xl font-bold rounded-md bg-b-primary text-t-primary">
        Logear
      </Link>
    </div>
  );
};

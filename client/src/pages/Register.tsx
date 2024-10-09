import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/emailValidator";
import { registerUser } from "../api/userReq";
import { toast } from "sonner";

interface IUserValues {
  username: boolean;
  email: boolean;
  password: boolean;
}
const initiaUserlValues: TUser = {
  id: "",
  username: "",
  email: "",
  password: "",
  isActive: false,
};
const initialValidValues: IUserValues = {
  username: false,
  email: false,
  password: false,
};

export const RegisterPage = () => {
  const [inputValues, setInputValues] = useState<TUser>(initiaUserlValues);
  const [isValidValue, setisValidValue] = useState<IUserValues>(initialValidValues);
  const navigateTo = useNavigate();

  //?: Para los inputs
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setisValidValue({
        ...isValidValue,
        email: validateEmail(e.target.value),
      });
    }
  }

  //? Se encarga de validar los valores de username, email y password
  useEffect(() => {
    setisValidValue({
      email: validateEmail(inputValues.email) && inputValues.email.length < 100,
      password: inputValues.password.length > 5 && inputValues.password.length < 64,
      username: inputValues.username.length < 40 && inputValues.username.length > 1,
    });
  }, [inputValues]);

  //?: Submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidValue.username || !isValidValue.email || !isValidValue.password) return;
    async function request() {
      const response = await registerUser(inputValues);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      navigateTo("/login");
    }
    request();
  }

  return (
    <section className="flex flex-col items-center justify-start w-full h-full max-w-lg px-2 py-5 md:h-auto md:justify-center md:px-10 md:py-10 md:rounded-xl animate-fadeIn bg-b-primary/75">
      <span className="flex flex-col items-start w-full mx-auto">
        <h2 className="text-4xl font-bold">Create an account</h2>
        <i className="w-full text-xl font-bold text-sky-400">It's quick and easy</i>
        <hr className="w-24 my-2 border-b-2 border-td-primary" />
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col w-full pt-10 mx-auto gap-y-6">
        <span className="flex flex-col">
          <label htmlFor="username" className="mb-3 font-bold">
            Username{" "}
            <b
              className={`transition-colors duration-500 ${isValidValue.username ? "text-green-500" : "text-red-500"}`}
            >
              *
            </b>
          </label>
          <input
            type="text"
            required
            value={inputValues?.username || ""}
            autoComplete="off"
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="Introduce your username (40 ch. max)"
            className={`px-3 py-2 rounded-md outline-none border-2 bg-t-primary/10 focus:bg-t-primary/15 placeholder:italic transition-colors duration-500 ${
              inputValues?.username.length === 0
                ? "border-transparent"
                : isValidValue.username
                ? "border-l-green-500 border-transparent"
                : "border-l-red-500 border-transparent"
            }`}
          />
        </span>

        <span className="flex flex-col">
          <label htmlFor="email" className="mb-3 font-bold">
            Email{" "}
            <b className={`transition-colors duration-500 ${isValidValue.email ? "text-green-500" : "text-red-500"}`}>
              *
            </b>
          </label>
          <input
            type="email"
            required
            value={inputValues?.email || ""}
            autoComplete="off"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Introduce your email"
            className={`px-3 py-2 rounded-md outline-none border-2 bg-t-primary/10 focus:bg-t-primary/15 placeholder:italic transition-colors duration-500 ${
              inputValues?.email.length === 0
                ? "border-transparent"
                : isValidValue.email
                ? "border-l-green-500 border-transparent"
                : "border-l-red-500 border-transparent"
            }`}
          />
        </span>

        <span className="flex flex-col">
          <label htmlFor="password" className="mb-3 font-bold">
            Password{" "}
            <b
              className={`transition-colors duration-500 ${isValidValue.password ? "text-green-500" : "text-red-500"}`}
            >
              *
            </b>
          </label>
          <input
            type="password"
            required
            value={inputValues?.password || ""}
            autoComplete="off"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            className={`px-3 py-2 rounded-md outline-none border-2 bg-t-primary/10 focus:bg-t-primary/15 placeholder:italic transition-colors duration-500 ${
              inputValues?.password.length === 0
                ? "border-transparent"
                : isValidValue.password
                ? "border-l-green-500 border-transparent"
                : "border-l-red-500 border-transparent"
            }`}
          />
        </span>

        <span className="flex flex-col items-center justify-center">
          <input
            type="submit"
            value="Create account"
            disabled={!isValidValue.email || !isValidValue.password || !isValidValue.username}
            className={`w-64 py-2 my-5 text-lg font-bold rounded-lg cursor-pointer text-b-primary bg-t-primary transition-all border-x-4 duration-500 disabled:cursor-default disabled:brightness-50 enabled:hover:border-x-green-500`}
          />
          <nav className="py-2">
            <p className="text-base font-semibold text-center">
              Already have an account?{" | "}
              <Link to={"/login"} className="font-bold transition-all duration-500 text-sky-400 hover:brightness-75">
                ↪ Log in
              </Link>
            </p>
          </nav>
        </span>
      </form>
    </section>
  );
};

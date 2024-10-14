import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/emailValidator";
import { loginUser } from "../api/userReq";
import { toast } from "sonner";

interface IUserValues {
  email: boolean;
  password: boolean;
}
const initiaUserlValues: TUser = {
  ID: "",
  Username: "",
  Email: "",
  Password: "",
  IsActive: false,
};
const initialValidValues: IUserValues = {
  email: false,
  password: false,
};

export const LoginPage = () => {
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

  //? Submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidValue.email || !isValidValue.password) return;

    async function request() {
      const response = await loginUser(inputValues);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      localStorage.setItem("current-user", JSON.stringify(response.data));
      navigateTo("/");
    }
    request();
  }

  //? Se encarga de validar los valores de email y password
  useEffect(() => {
    setisValidValue({
      email: validateEmail(inputValues.Email) && inputValues.Email.length < 100,
      password: inputValues.Password.length > 5 && inputValues.Password.length < 64,
    });
  }, [inputValues]);

  return (
    <section className="flex flex-col items-center justify-start w-full h-full max-w-lg px-2 py-5 md:h-auto md:justify-center md:px-10 md:py-10 md:rounded-xl animate-fadeIn bg-b-primary/75">
      <span className="flex flex-col items-center w-full mx-auto md:items-start">
        <h2 className="text-4xl font-bold">Play now</h2>
        <i className="text-xl font-bold text-sky-400">Test your skills...</i>
        <hr className="w-24 my-2 border-b-2 border-td-primary" />
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col w-full pt-10 mx-auto gap-y-6">
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
            value={inputValues?.Email || ""}
            autoComplete="off"
            id="Email"
            name="Email"
            onChange={handleChange}
            placeholder="Introduce your email"
            className={`px-3 py-2 rounded-md outline-none border-2 bg-t-primary/10 focus:bg-t-primary/15 placeholder:italic transition-colors duration-500 ${
              inputValues?.Email.length === 0
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
            value={inputValues?.Password || ""}
            autoComplete="off"
            id="Password"
            name="Password"
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            className={`px-3 py-2 rounded-md outline-none border-2 bg-t-primary/10 focus:bg-t-primary/15 placeholder:italic transition-colors duration-500 ${
              inputValues?.Password.length === 0
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
            value="Login"
            disabled={!isValidValue.email || !isValidValue.password}
            className={`w-64 py-2 my-5 text-lg font-bold rounded-lg cursor-pointer text-b-primary bg-t-primary transition-all border-x-4 duration-500 disabled:cursor-default disabled:brightness-50 enabled:hover:border-x-green-500`}
          />
          <nav className="py-2">
            <p className="text-base font-semibold text-center">
              Don't have an account?{" | "}
              <Link to={"/register"} className="font-bold transition-all duration-500 text-sky-400 hover:brightness-75">
                ↪ Create account
              </Link>
            </p>
          </nav>
        </span>
      </form>
    </section>
  );
};

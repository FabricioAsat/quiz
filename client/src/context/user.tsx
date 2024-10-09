import { createContext, useContext, useEffect, useState } from "react";

interface IUserProps {
  user: TUser | undefined;
}

const userContext = createContext<IUserProps | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | undefined>();

  //
  useEffect(() => {
    const auxUser = localStorage.getItem("user");
    if (auxUser) setUser(JSON.parse(auxUser));
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

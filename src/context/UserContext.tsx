import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { AuditorDataResponse, LoginResponse } from "../types/auth";
import { getDataFromLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

interface IUserContext {
  user: AuditorDataResponse | null;
  saveUser: (user: LoginResponse) => void;
  removeUser: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  saveUser: () => {},
  removeUser: () => {},
} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuditorDataResponse | null>(() => {
    const storedUser = getDataFromLocalStorage("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as AuditorDataResponse;
      } catch (e) {
        console.error("Error al parsear el usuario del localStorage:", e);
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const saveUser = (data: LoginResponse): void => {
    const { token, data: dataToSave } = data;

    // Guardar usuario y token en localStorage
    localStorage.setItem("user", JSON.stringify(dataToSave));
    localStorage.setItem("token", token); // Agrega esta línea

    setUser(dataToSave);

    // También guardas el token en la cookie, si así lo deseas
    document.cookie = `token=${token}; path=/;`;

    navigate("/dashboard");
  };

  const removeUser = () => {
    const logoutPromise = () =>
      new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 700)
      );

    toast.promise(logoutPromise, {
      loading: "Cerrando sesión...",
      success: () => {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
        return "Nos vemos pronto! 👋";
      },
      error: (err) => `Error: ${err}`,
      style: {
        justifyContent: "center",
      },
      position: "top-center",
    });
  };

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}

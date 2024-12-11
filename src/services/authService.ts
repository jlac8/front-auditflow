import { API_AUTH_URL } from "../config";
import type {
  LoginResponse,
  RegisterResponse,
  AuditorRegForm,
  LoginForm,
} from "../types/auth";

export const login = async (form: LoginForm): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const errorRes = await res.json();

      if (res.status === 500)
        throw new Error("Error de servidor. Por favor, inténtalo de nuevo 😢");
      throw new Error(
        errorRes.errors?.[0]?.message || "Error al iniciar sesión"
      );
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAuditor = async (
  form: AuditorRegForm
): Promise<RegisterResponse> => {
  try {
    const { ...formToSend } = form;
    const res = await fetch(`${API_AUTH_URL}/register-auditor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formToSend),
    });
    if (!res.ok)
      throw new Error(
        "Error al registrar turista 😢 Por favor, inténtalo de nuevo"
      );

    return res.json() as Promise<RegisterResponse>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAgency = async (
  form: AuditorRegForm
): Promise<RegisterResponse> => {
  try {
    const { ...formToSend } = form;
    const res = await fetch(`${API_AUTH_URL}/register-agency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formToSend),
    });
    if (!res.ok)
      throw new Error(
        "Error al registrar agencia 😢 Por favor, inténtalo de nuevo"
      );
    return res.json() as Promise<RegisterResponse>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

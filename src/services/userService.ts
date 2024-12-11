const API_BASE_URL = "http://localhost:3000/api";

export async function updateUserProfile(formData: FormData) {
  try {
    // Suponemos que el usuario ya tiene un token en localStorage o context para autenticar la request.
    // Ajusta según tu lógica de autenticación.
    const token = localStorage.getItem("token"); // Ejemplo
    const res = await fetch(`${API_BASE_URL}/auditors/profile`, {
      method: "PUT",
      headers: {
        // No se establece "Content-Type" ya que fetch lo hará automáticamente con formData
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(
        errorRes?.errors?.[0]?.message || "Error al actualizar el perfil"
      );
    }

    const updatedAuditor = await res.json();
    return updatedAuditor.data || updatedAuditor; // Ajusta según la estructura de respuesta del backend
  } catch (error: any) {
    console.error("Error en updateUserProfile:", error);
    throw new Error(
      error.message || "Error desconocido al actualizar el perfil"
    );
  }
}

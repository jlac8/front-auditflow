const API_BASE_URL = "http://localhost:3000/api";

export async function fetchAudits(token: string) {
  const res = await fetch(`${API_BASE_URL}/audits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes?.error || "Error al obtener auditorías");
  }
  const data = await res.json();
  return data.data; // Devuelve las auditorías
}

export async function createAudit(
  token: string,
  auditData: { leaderName: string; auditName: string; period: string }
) {
  const res = await fetch(`${API_BASE_URL}/audits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auditData), // Nombres correctos
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes?.error || "Error al crear la auditoría");
  }

  const data = await res.json();
  return data.data;
}

export async function deleteAudit(token: string, auditId: number) {
  const res = await fetch(`${API_BASE_URL}/audits/${auditId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes?.error || "Error al eliminar la auditoría");
  }
}

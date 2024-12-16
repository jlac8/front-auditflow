import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAudits, deleteAudit } from "../services/auditsService";

interface Audit {
  id: number;
  leaderName: string;
  auditName: string;
  status: string;
  period: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [audits, setAudits] = useState<Audit[]>([]);
  const team = "Inversiones";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }

    (async () => {
      try {
        const auditsData: Audit[] = await fetchAudits(token);
        setAudits(auditsData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate]);

  const handleViewClick = (auditId: number) => {
    navigate(`/risk-matrix/${auditId}`);
  };

  const handleAddAudit = () => {
    navigate("/new-audit");
  };

  const handleDeleteClick = async (auditId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión.");
      navigate("/sign-in");
      return;
    }

    if (window.confirm("¿Estás seguro de eliminar esta auditoría?")) {
      try {
        await deleteAudit(token, auditId);
        setAudits((prev) => prev.filter((audit) => audit.id !== auditId));
        alert("Auditoría eliminada con éxito.");
      } catch (error) {
        console.error(error);
        alert("Error al eliminar la auditoría.");
      }
    }
  };

  return (
    <main className="flex flex-col px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Equipo: <span className="text-blue-600">{team}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Auditorías del equipo {team}
          </h2>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="p-2 border">Auditor Líder</th>
                <th className="p-2 border">Auditoría</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Periodo</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="text-sm text-gray-700">
                  <td className="p-2 border">{audit.leaderName}</td>
                  <td className="p-2 border">{audit.auditName}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        audit.status === "Activa"
                          ? "bg-green-500"
                          : audit.status === "Cerrada"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {audit.status}
                    </span>
                  </td>
                  <td className="p-2 border">{audit.period}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleViewClick(audit.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleDeleteClick(audit.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleAddAudit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Añadir Auditoría
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

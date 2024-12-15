import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(); // Corrección 1: Agregar useNavigate

  const team = "Inversiones";

  const audits = [
    { id: 1, leader: "Diego", name: "Divisas", status: "Activa", period: 2024 },
    { id: 2, leader: "Fiorella", name: "MdD", status: "Activa", period: 2024 },
    {
      id: 3,
      leader: "Emily",
      name: "Derivados",
      status: "Cerrada",
      period: 2024,
    },
    {
      id: 4,
      leader: "Paola",
      name: "Inversiones",
      status: "Cerrada",
      period: 2024,
    },
    {
      id: 5,
      leader: "Amado",
      name: "Divisas",
      status: "Cerrada",
      period: 2024,
    },
  ];

  const handleViewClick = (auditId) => {
    navigate(`/risk-matrix/${auditId}`); // Corrección 2: usar audit.id en lugar de audit.name
  };

  const handleAddAudit = () => {
    navigate("/new-audit");
  };

  const handleDeleteClick = (auditId) => {
    alert(`Eliminar auditoría con ID ${auditId} no está implementado.`);
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
                  <td className="p-2 border">{audit.leader}</td>
                  <td className="p-2 border">{audit.name}</td>
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
                      onClick={() => handleViewClick(audit.id)} // Corrección 3: usar audit.id
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

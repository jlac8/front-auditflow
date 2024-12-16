import { useState } from "react";
import * as XLSX from "xlsx";
import { createAudit } from "../services/auditsService";
import { useNavigate } from "react-router-dom";

interface Risk {
  auditor: string;
  risk: string;
  control: string;
  walkthrough: string;
}

function NewAudit() {
  const navigate = useNavigate();
  const [leader, setLeader] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [risks, setRisks] = useState<Risk[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setExcelFile(null);
      setRisks([]);
      return;
    }

    const file: File = files[0];
    setExcelFile(file);

    try {
      const data = await readExcelFile(file);
      setRisks(data);
    } catch (error) {
      console.error("Error al procesar el archivo Excel:", error);
    }
  };

  const readExcelFile = (file: File): Promise<Risk[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target) {
          reject(new Error("Error al leer el archivo: target nulo"));
          return;
        }

        try {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          if (jsonData.length === 0) {
            resolve([]);
            return;
          }

          const formattedData: Risk[] = jsonData.slice(1).map((row: any[]) => ({
            auditor: row[0] || "",
            risk: row[1] || "",
            control: row[2] || "",
            walkthrough: row[3] || "",
          }));
          resolve(formattedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const addRisk = () => {
    const newRisk: Risk = {
      auditor: "",
      risk: "",
      control: "",
      walkthrough: "",
    };
    setRisks([...risks, newRisk]);
  };

  const handleRiskChange = (
    index: number,
    field: keyof Risk,
    value: string
  ) => {
    const updatedRisks = risks.map((risk, i) =>
      i === index ? { ...risk, [field]: value } : risk
    );
    setRisks(updatedRisks);
  };

  const handleCreateAudit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No hay token, inicia sesión primero.");
        navigate("/sign-in");
        return;
      }

      if (!leader.trim() || !name.trim() || !period.trim()) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      // Cambia los nombres de los campos a los esperados
      const newAudit = await createAudit(token, {
        leaderName: leader,
        auditName: name,
        period,
      });

      alert("Auditoría creada con éxito");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al crear la auditoría");
    }
  };

  return (
    <div className="bg-gray-50 p-5">
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Crear Auditoría</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Detalles de la Auditoría
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Auditor Líder
            </label>
            <input
              type="text"
              placeholder="Ejemplo: Diego"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Auditoría
            </label>
            <input
              type="text"
              placeholder="Ejemplo: ALM"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Periodo
            </label>
            <input
              type="text"
              placeholder="Ejemplo: 2024"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargar Matriz de Riesgos base (Opcional)
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
        </div>

        <div className="col-span-3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Asignación de equipo de trabajo
          </h2>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="p-2 border">Auditor</th>
                <th className="p-2 border">Riesgo</th>
                <th className="p-2 border">Control</th>
                <th className="p-2 border">Recorrido</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="p-2 border">
                    <textarea
                      value={risk.auditor}
                      onChange={(e) =>
                        handleRiskChange(index, "auditor", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2 border">
                    <textarea
                      value={risk.risk}
                      onChange={(e) =>
                        handleRiskChange(index, "risk", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2 border">
                    <textarea
                      value={risk.control}
                      onChange={(e) =>
                        handleRiskChange(index, "control", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2 border">
                    <textarea
                      value={risk.walkthrough}
                      onChange={(e) =>
                        handleRiskChange(index, "walkthrough", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded resize-none"
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addRisk}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Añadir riesgo
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleCreateAudit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Crear Auditoría
        </button>
      </div>
    </div>
  );
}

export default NewAudit;

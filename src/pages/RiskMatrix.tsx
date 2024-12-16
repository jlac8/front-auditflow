import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import Button from "@mui/material/Button";

// Definimos RowType para que coincida con DataTable
interface RowType {
  id: number;
  riesgo: string;
  control: string;
  recorrido: string;
  politica: string;
  palabrasClave: string[];
}

function RiskMatrix() {
  const [journeyName, setJourneyName] = useState("");
  const navigate = useNavigate();
  const { team, audit } = useParams(); // Obtener parámetros desde la URL

  const risksData: RowType[] = [
    {
      id: 1,
      riesgo:
        "Deficiencias de eliminación de accesos antiguos. Posibilidad que usuarios sin relación activa accedan a información sensible. Pérdidas de confidencialidad en los datos financieros críticos.",
      control:
        "Verificación mensual por parte del equipo de Seguridad TI, de que los accesos sean eliminados en tiempo. En caso de que persistan accesos, la evidencia del control se registra en el informe mensual.",
      recorrido:
        "Responsable: Jefe de Seguridad TI\nFecha de Reunión: 15/11/2024\nConclusión: Satisfactorio.",
      politica: "",
      palabrasClave: ["accesos", "bajas", "ceses"],
    },
    {
      id: 2,
      riesgo:
        "Deficiencias en la desactivación de accesos temporales. Posibilidad que accesos vencidos sean utilizados. Pérdidas por accesos no autorizados a datos confidenciales.",
      control:
        "Verificación semanal por parte del Líder de Operaciones, de que los accesos temporales sean desactivados oportunamente. En caso de encontrar accesos activos, la evidencia del control está en el reporte semanal de eliminación.",
      recorrido:
        "Responsable: Líder de Operaciones\nFecha de Reunión: 20/11/2024\nConclusión: Conforme.",
      politica: "",
      palabrasClave: ["accesos", "temporal"],
    },
  ];

  const [selectedRows, setSelectedRows] = useState<RowType[]>([]);
  const [pdfFileName, setPdfFileName] = useState("");

  // Ahora handleRowSelection recibe un RowType[]
  const handleRowSelection = (newSelection: RowType[]) => {
    setSelectedRows(newSelection);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setPdfFileName(file.name);
      } else {
        alert("Por favor, selecciona un archivo PDF válido.");
      }
    }
  };

  const handleGenerate = () => {
    if (!journeyName.trim()) return;

    navigate(`/${team}/${audit}/${journeyName}`, {
      state: { journeyName, selectedRows },
    });
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-400">
          Matriz de Riesgos: ALM
        </h1>
      </header>

      <DataTable rows={risksData} onSelectionChange={handleRowSelection} />

      <footer className="mt-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button>
            <label className="cursor-pointer">
              Adjuntar Nueva Política
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
          {pdfFileName && (
            <span className="text-gray-600 text-sm">
              Archivo adjuntado: <strong>{pdfFileName}</strong>
            </span>
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Nombre del recorrido"
            value={journeyName}
            onChange={(e) => setJourneyName(e.target.value)}
            className="p-2 rounded"
          />
          <Button
            onClick={handleGenerate}
            disabled={!journeyName.trim()}
            className={`${
              journeyName.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Generar Recorrido
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default RiskMatrix;

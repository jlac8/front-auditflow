import { useState } from "react";
import DataTable from "../components/DataTable";
import Button from "@mui/material/Button";

function RiskMatrix() {
  const [journeyName, setJourneyName] = useState("");
  const navigate = useNavigate();
  const { team, audit } = useParams(); // Obtener el equipo y la auditoría desde la URL actual

  const handleGenerate = () => {
    if (!journeyName.trim()) return;
    // Redirigir a la página del recorrido generado
    navigate(`/${team}/${audit}/${journeyName}`, {
      state: { journeyName, selectedRows },
    });
  };
  // Datos hardcodeados
  const risksData = [
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
    {
      id: 3,
      riesgo:
        "Errores en los registros contables que pueden llevar a discrepancias en las transacciones financieras.",
      control:
        "Revisión semanal por parte de la Analista II de Finanzas de todos los asientos contables generados en el período. La Analista II revisa el libro de ingresos y egresos de la semana y compara los registros con los estados de cuenta del banco; si observa discrepancias, el equipo realiza un seguimiento inmediato.",
      recorrido:
        "Responsable: Luis Herrera - Analista de Finanzas; Reemplazo: Carla Romero - Coordinadora de Finanzas; Fecha reunión: 21/06/2024; Operación seleccionada: Verificación de registros de la semana del 12 al 18 de junio de 2024; Principales cambios: Implementación de nuevo software; Evidencia: Reportes de corrección Conclusión: El control se verifica periódicamente y mitiga adecuadamente los riesgos.",
      politica: "",
      palabrasClave: [],
    },
    {
      id: 4,
      riesgo:
        "Omissión en el cálculo de impuestos que puede resultar en multas y sanciones.",
      control:
        "Implementación de un sistema de alertas automáticas que notifica al Analista III de Impuestos sobre las fechas de vencimiento de las declaraciones. El Analista III revisa mensualmente los cálculos de impuestos realizados, utilizando un software de auditoría fiscal que compara cifras con reportes de autoridades fiscales.",
      recorrido:
        "Responsable: Teresa López - Analista de Impuestos; Reemplazo: Fernando Aguirre - Jefe de Impuestos; Fecha reunión: 05/07/2024; Operación seleccionada: Revisión de cálculos de impuestos del mes de junio de 2024; Principales cambios: Actualización de normativa fiscal; Evidencia: Reportes de alertas y documentos de revisión. Conclusión: Control activo y efectivo para evitar riesgos fiscales.",
      politica: "",
      palabrasClave: [],
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFileName(file.name); // Guardamos el nombre del archivo PDF
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-400">
          Matriz de Riesgos: Retesting
        </h1>
      </header>
      {/* Pasamos los datos y el manejador de selección al DataTable */}
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
          {/* Mostrar el nombre del PDF adjuntado */}
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
            disabled={!journeyName.trim()} // Deshabilitar el botón si el campo está vacío
            className={` ${
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

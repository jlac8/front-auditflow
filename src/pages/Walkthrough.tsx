import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function Walkthrough() {
  const location = useLocation();
  const navigate = useNavigate();
  const { team, audit } = useParams();
  const { journeyName, selectedRows } = location.state || {};

  // Referencia para el input de archivo
  const videoInputRef = useRef(null);

  const handleGenerateDocumentation = () => {
    navigate(`/${team}/${audit}/${journeyName}/doc`, {
      state: { journeyName, selectedRows },
    });
  };

  const handleVideoUploadClick = () => {
    // Simula un clic en el input de archivo
    videoInputRef.current.click();
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Archivo seleccionado: ${file.name}`);
      // Aquí puedes realizar acciones adicionales, como enviar el archivo al backend
    }
  };

  return (
    <div className="p-6">
      {/* Título principal */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          AuditFlow {audit} - {journeyName}
        </h1>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">"Hola"</p>
        </div>{" "}
      </header>

      {/* Tabla de riesgos */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="p-2 border">Risk</th>
              <th className="p-2 border">Control</th>
              <th className="p-2 border">Recorrido</th>
              <th className="p-2 border">Evidencias a Solicitar</th>
              <th className="p-2 border">Tener en Cuenta</th>
              <th className="p-2 border">Posible Observación</th>
            </tr>
          </thead>
          <tbody>
            {selectedRows && selectedRows.length > 0 ? (
              selectedRows.map((row, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="p-2 border">{row.risk}</td>
                  <td className="p-2 border">{row.control}</td>
                  <td className="p-2 border whitespace-pre-line">
                    {row.walkthrough}
                  </td>
                  <td className="p-2 border whitespace-pre-line">
                    {row.evidenceToRequest}
                  </td>
                  <td className="p-2 border">{row.toConsider}</td>
                  <td className="p-2 border">{row.possibleObservation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-4 text-center text-gray-500 italic border"
                >
                  No se seleccionaron riesgos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botones de acciones */}
      <footer className="mt-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button />
          <Button />
        </div>
        <div className="flex space-x-4">
          {/* Botón para subir video */}
          <button
            onClick={handleVideoUploadClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Subir Video o Transcripción
          </button>
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            className="hidden"
            onChange={handleVideoUpload}
          />
          {/* Botón para generar documentación */}
          <button
            onClick={handleGenerateDocumentation}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Generar Documentación
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Walkthrough;

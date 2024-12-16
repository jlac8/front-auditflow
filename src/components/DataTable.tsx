// src/components/DataTable.tsx

import React, { useState, useEffect } from "react";
import {
  DataGrid,
  type GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// Definición de la interfaz para cada fila de datos
interface RowType {
  id: string;
  riesgo: string;
  control: string;
  recorrido: string;
  politica: string;
  palabrasClave: string[];
}

// Definición de las props que recibe el componente DataTable
interface DataTableProps {
  rows: RowType[];
  onSelectionChange: (selectedRows: RowType[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ rows, onSelectionChange }) => {
  // Estado local para gestionar las filas internamente y evitar la mutación directa de las props
  const [localRows, setLocalRows] = useState<RowType[]>(rows);

  // Efecto para actualizar el estado local cuando las props cambian
  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  // Función para manejar el cambio en la política
  const handlePolicyChange = (id: string, newPolicy: string) => {
    const updatedRows = localRows.map((row) =>
      row.id === id ? { ...row, politica: newPolicy } : row
    );
    setLocalRows(updatedRows);
  };

  // Función para agregar una nueva palabra clave
  const handleAddKeyword = (id: string, keyword: string) => {
    if (keyword.trim() === "") return;
    const updatedRows = localRows.map((row) =>
      row.id === id
        ? {
            ...row,
            palabrasClave: [...row.palabrasClave, keyword],
          }
        : row
    );
    setLocalRows(updatedRows);
  };

  // Función para eliminar una palabra clave existente
  const handleDeleteKeyword = (id: string, keyword: string) => {
    const updatedRows = localRows.map((row) =>
      row.id === id
        ? {
            ...row,
            palabrasClave: row.palabrasClave.filter((tag) => tag !== keyword),
          }
        : row
    );
    setLocalRows(updatedRows);
  };

  // Definición de las columnas para el DataGrid
  const columns: GridColDef[] = [
    { field: "riesgo", headerName: "Riesgo", flex: 2 },
    { field: "control", headerName: "Control", flex: 2 },
    { field: "recorrido", headerName: "Recorrido", flex: 2 },
    {
      field: "politica",
      headerName: "Política",
      flex: 1,
      renderCell: (params) => (
        <TextField
          value={params.row.politica}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePolicyChange(params.row.id, e.target.value)
          }
          placeholder="Buscar política"
          size="small"
          fullWidth
        />
      ),
    },
    {
      field: "palabrasClave",
      headerName: "Palabras Clave",
      flex: 2,
      renderCell: (params) => (
        <div className="flex flex-wrap gap-2 items-center">
          {params.row.palabrasClave.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleDeleteKeyword(params.row.id, keyword)}
              size="small"
              style={{ marginRight: 4 }}
            />
          ))}
          <TextField
            placeholder="Nueva palabra clave"
            size="small"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                const value = target.value.trim();
                if (value !== "") {
                  handleAddKeyword(params.row.id, value);
                  target.value = "";
                }
              }
            }}
          />
        </div>
      ),
    },
  ];

  // Función para manejar el cambio en la selección de filas
  const handleSelectionChange = (newSelection: GridSelectionModel) => {
    const selectedRows = localRows.filter((row) =>
      newSelection.includes(row.id)
    );
    onSelectionChange(selectedRows);
  };

  return (
    <Paper sx={{ height: 500, width: "100%", padding: 2 }}>
      <DataGrid
        rows={localRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
        disableSelectionOnClick
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "1.5",
            display: "block",
          },
          "& .MuiDataGrid-columnHeader": {
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;

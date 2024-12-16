import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const DataTable = ({ rows, onSelectionChange }) => {
  const handlePolicyChange = (id, newPolicy) => {
    rows = rows.map((row) =>
      row.id === id ? { ...row, politica: newPolicy } : row
    );
  };

  const handleAddKeyword = (id, keyword) => {
    if (keyword.trim() === "") return;
    rows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            palabrasClave: [...row.palabrasClave, keyword],
          }
        : row
    );
  };

  const handleDeleteKeyword = (id, keyword) => {
    rows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            palabrasClave: row.palabrasClave.filter((tag) => tag !== keyword),
          }
        : row
    );
  };

  const columns = [
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
          onChange={(e) => handlePolicyChange(params.row.id, e.target.value)}
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
            placeholder="New tag"
            size="small"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                handleAddKeyword(params.row.id, e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          const selectedRows = rows.filter((row) =>
            newSelection.includes(row.id)
          );
          onSelectionChange(selectedRows);
        }}
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

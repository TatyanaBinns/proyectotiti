import {Box,Typography} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";



function Home() {
  const columns = [
    { field: 'id', headerName: 'Tracker ID', width: 200 },
  ];
  
  const rows = [
    { id: 1},
    { id: 2},
    { id: 3},
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  const submitForm = () => {
    console.log(selectedRows);
  };

  return (
    <div className="Settings-header">
      <Header/>
      <div className="Table-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) =>
              selectedIDs.has(row.id),
            );
  
            setSelectedRows(selectedRows);
          }}
        />
        <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              backgroundColor: "#299846",
            }}
            margin = "normal"
            className="form-input"
            size="large"
            onClick={submitForm}
          >
            View Selected Tracker Data
          </Button>  
      </div>
    </div>
  );
}
export default Home;
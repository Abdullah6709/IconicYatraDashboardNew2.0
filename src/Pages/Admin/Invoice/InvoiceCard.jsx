import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialData = [
  {
    id: 1,
    invoiceNo: "INV-001",
    invoiceDate: "2025-10-01",
    dueDate: "2025-10-10",
    name: "John Doe",
    total: "₹2500",
    received: "₹2000",
    balance: "₹500",
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    invoiceDate: "2025-10-02",
    dueDate: "2025-10-11",
    name: "Jane Smith",
    total: "₹3000",
    received: "₹2500",
    balance: "₹500",
  },
  {
    id: 3,
    invoiceNo: "INV-003",
    invoiceDate: "2025-10-03",
    dueDate: "2025-10-12",
    name: "Rahul Kumar",
    total: "₹1500",
    received: "₹1500",
    balance: "₹0",
  },
  {
    id: 4,
    invoiceNo: "INV-004",
    invoiceDate: "2025-10-04",
    dueDate: "2025-10-13",
    name: "Emily Davis",
    total: "₹4000",
    received: "₹3000",
    balance: "₹1000",
  },
  {
    id: 5,
    invoiceNo: "INV-005",
    invoiceDate: "2025-10-05",
    dueDate: "2025-10-14",
    name: "Mohit Sharma",
    total: "₹1800",
    received: "₹1000",
    balance: "₹800",
  },
  {
    id: 6,
    invoiceNo: "INV-006",
    invoiceDate: "2025-10-06",
    dueDate: "2025-10-15",
    name: "Sophia Johnson",
    total: "₹2700",
    received: "₹2700",
    balance: "₹0",
  },
  {
    id: 7,
    invoiceNo: "INV-007",
    invoiceDate: "2025-10-07",
    dueDate: "2025-10-16",
    name: "Amit Patel",
    total: "₹5000",
    received: "₹4000",
    balance: "₹1000",
  },
  {
    id: 8,
    invoiceNo: "INV-008",
    invoiceDate: "2025-10-08",
    dueDate: "2025-10-17",
    name: "Olivia Brown",
    total: "₹2200",
    received: "₹1500",
    balance: "₹700",
  },
  {
    id: 9,
    invoiceNo: "INV-009",
    invoiceDate: "2025-10-09",
    dueDate: "2025-10-18",
    name: "Ravi Singh",
    total: "₹3500",
    received: "₹2000",
    balance: "₹1500",
  },
  {
    id: 10,
    invoiceNo: "INV-010",
    invoiceDate: "2025-10-10",
    dueDate: "2025-10-19",
    name: "Liam Wilson",
    total: "₹2800",
    received: "₹2800",
    balance: "₹0",
  },
];

const InvoiceCard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceList, setInvoiceList] = useState(initialData);

  const handleAddClick = () => {
    navigate("/invoiceform");
  };

  const handleEditClick = (row) => {
    navigate("/invoice/edit", { state: { invoiceData: row } });
  };

  const handleDeleteClick = (id) => {
    const updatedList = invoiceList.filter((item) => item.id !== id);
    setInvoiceList(updatedList);
  };

  const columns = [
    { field: "id", headerName: "Sr No.", width: 70 },
    { field: "invoiceNo", headerName: "Invoice No", width: 120 },
    { field: "invoiceDate", headerName: "Invoice Date", width: 120 },
    { field: "dueDate", headerName: "Due Date", width: 120 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "total", headerName: "Total", width: 100 },
    { field: "received", headerName: "Received", width: 100 },
    { field: "balance", headerName: "Balance", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return invoiceList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, invoiceList]);

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        {/* Action bar */}
        <Box
          mt={3}
          mb={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={2}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{ minWidth: 100 }}
            onClick={handleAddClick}
          >
            Add
          </Button>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: "100%", sm: 250 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Data Table */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: "800px" }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7, 25, 50, 100]}
              autoHeight
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default InvoiceCard;

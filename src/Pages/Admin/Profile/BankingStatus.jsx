import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AccountBalanceWallet, Add, CurrencyRupee, AttachMoney, Edit } from "@mui/icons-material";

// Import your dialog component
import AddBankDialog from "./Dialog/AddBankDialog";

const BankingStatus = () => {
  const [selectedBank, setSelectedBank] = useState(""); // Empty string for no default selection
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [banks, setBanks] = useState([
    { 
      value: "kotakBank", 
      label: "KOTAK BANK",
      details: {
        bankName: "KOTAK BANK",
        branchName: "SECTOR 18 NOIDA",
        accountHolderName: "ICONIC YATRA",
        accountNumber: "7147083682",
        ifscCode: "KKBK0005033",
        openingBalance: "₹ 42,000",
        availableBalance: "₹ 42,940",
        currency: "₹"
      }
    },
    { 
      value: "yesBank", 
      label: "YES BANK",
      details: {
        bankName: "YES BANK",
        branchName: "SECTOR 63 NOIDA",
        accountHolderName: "ICONIC YATRA",
        accountNumber: "1463400002757",
        ifscCode: "YESB0000014",
        openingBalance: "₹ 47,000",
        availableBalance: "NA",
        currency: "₹"
      }
    },
  ]);

  const [newBankDetails, setNewBankDetails] = useState({
    bankName: "",
    branchName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    openingBalance: "",
    currency: "₹"
  });

  const [editBankDetails, setEditBankDetails] = useState({
    bankName: "",
    branchName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    openingBalance: "",
    currency: "₹"
  });

  const bankingData = {
    lastUpdated: "31/10/2025",
    transactions: []
  };

  const handleAddNewBank = () => {
    if (newBankDetails.bankName.trim()) {
      const newBankValue = newBankDetails.bankName.toLowerCase().replace(/\s+/g, '');
      const newBankOption = {
        value: newBankValue,
        label: newBankDetails.bankName.toUpperCase(),
        details: {
          ...newBankDetails,
          availableBalance: "NA"
        }
      };
      
      setBanks(prev => [...prev, newBankOption]);
      setSelectedBank(newBankValue);
      
      // Reset form and close dialog
      setNewBankDetails({
        bankName: "",
        branchName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        openingBalance: "",
        currency: "₹"
      });
      setAddDialogOpen(false);
    }
  };

  const handleEditBank = () => {
    if (editBankDetails.bankName.trim()) {
      setBanks(prev => prev.map(bank => 
        bank.value === selectedBank 
          ? {
              ...bank,
              label: editBankDetails.bankName.toUpperCase(),
              details: {
                ...editBankDetails,
                availableBalance: bank.details.availableBalance // Preserve available balance
              }
            }
          : bank
      ));
      
      setEditDialogOpen(false);
    }
  };

  const handleNewBankChange = (field, value) => {
    setNewBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditBankChange = (field, value) => {
    setEditBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseDialog = () => {
    setAddDialogOpen(false);
    // Reset form when closing
    setNewBankDetails({
      bankName: "",
      branchName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      openingBalance: "",
      currency: "₹"
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    const currentBank = banks.find(bank => bank.value === selectedBank);
    if (currentBank) {
      setEditBankDetails(currentBank.details);
      setEditDialogOpen(true);
    }
  };

  const selectedBankData = banks.find(bank => bank.value === selectedBank)?.details;

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Banking & Status
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage and monitor your financial transactions and balances
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, md:8}}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Select Bank</InputLabel>
            <Select
              value={selectedBank}
              label="Select Bank"
              onChange={(e) => {
                if (e.target.value === "addNew") {
                  setAddDialogOpen(true);
                } else {
                  setSelectedBank(e.target.value);
                }
              }}
              displayEmpty
            >
              {banks.map((bank) => (
                <MenuItem key={bank.value} value={bank.value}>
                  {bank.label}
                </MenuItem>
              ))}
              <MenuItem value="addNew">
                <Add sx={{ mr: 1, fontSize: 18 }} />
                Add New Bank
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12, md:4}}>
          <Paper 
            sx={{ 
              p: 3, 
              backgroundColor: '#f5f5f5',
              borderLeft: '4px solid #1976d2'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Available Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {selectedBankData?.availableBalance || "NA"}
                </Typography>
              </Box>
              {selectedBankData?.currency === "₹" ? (
                <CurrencyRupee sx={{ fontSize: 40, color: '#1976d2' }} />
              ) : (
                <AttachMoney sx={{ fontSize: 40, color: '#1976d2' }} />
              )}
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              Details as on {bankingData.lastUpdated}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bank Details Card - Only show when a bank is selected */}
      {selectedBank && selectedBankData && (
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent sx={{ p: 4, position: 'relative' }}>
            {/* Edit Button */}
            <IconButton 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16,
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
              onClick={handleEditClick}
            >
              <Edit />
            </IconButton>

            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
              {selectedBankData.bankName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
              Update Bank Details
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{xs:12, md:6}}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    *Name of Bank
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.bankName}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Branch Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.branchName}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    *Account Holder Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.accountHolderName}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    *Account Number
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.accountNumber}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    IFSC Code
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.ifscCode}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Opening Balance
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedBankData.openingBalance}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Additional details for Kotak Bank */}
            {selectedBank === "kotakBank" && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Branch Name: {selectedBankData.branchName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>IFSC Code:</strong> {selectedBankData.ifscCode}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Transaction History
          </Typography>
        </Box>
        
        <Divider />
        
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Associate Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Particular</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankingData.transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <AccountBalanceWallet 
                        sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} 
                      />
                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        No transactions found
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        There are no transactions to display for the selected period.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                bankingData.transactions.map((transaction, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{transaction.associateName}</TableCell>
                    <TableCell>{transaction.particular}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        ₹{transaction.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Imported Add Bank Dialog */}
      <AddBankDialog
        open={addDialogOpen}
        onClose={handleCloseDialog}
        newBankDetails={newBankDetails}
        onNewBankChange={handleNewBankChange}
        onAddBank={handleAddNewBank}
      />

      {/* Edit Bank Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Edit Bank Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Update Bank Details
            </Typography>

            <Box display="flex" gap={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="*Name of Bank"
                value={editBankDetails.bankName}
                onChange={(e) => handleEditBankChange("bankName", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Branch Name"
                value={editBankDetails.branchName}
                onChange={(e) => handleEditBankChange("branchName", e.target.value)}
                margin="normal"
              />
            </Box>

            <TextField
              fullWidth
              label="*Account Holder Name"
              value={editBankDetails.accountHolderName}
              onChange={(e) => handleEditBankChange("accountHolderName", e.target.value)}
              margin="normal"
              sx={{ mb: 2 }}
            />

            <Box display="flex" gap={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="*Account Number"
                value={editBankDetails.accountNumber}
                onChange={(e) => handleEditBankChange("accountNumber", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="IFSC Code"
                value={editBankDetails.ifscCode}
                onChange={(e) => handleEditBankChange("ifscCode", e.target.value)}
                margin="normal"
              />
            </Box>

            <TextField
              fullWidth
              label="Opening Balance"
              value={editBankDetails.openingBalance}
              onChange={(e) => handleEditBankChange("openingBalance", e.target.value)}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditBank}
            variant="contained"
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
          >
            Update
          </Button>
          <Button
            onClick={handleCloseEditDialog}
            variant="outlined"
            sx={{ color: "primary.main", borderColor: "primary.main" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BankingStatus;
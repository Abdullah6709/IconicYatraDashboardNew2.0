import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Avatar,
  Button,
  Container,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";

// Import the BankingStatus component
import BankingStatus from "./BankingStatus";

const CompanyProfile = () => {
  const [selected, setSelected] = useState("Company Profile");
  const [editDialog, setEditDialog] = useState({ open: false, field: "", value: "" });
  const [passwordDialog, setPasswordDialog] = useState({ open: false, currentPassword: "", newPassword: "", confirmPassword: "" });
  const [companyData, setCompanyData] = useState({
    headerLogo: "/logo192.png",
    footerLogo: "/logo192.png",
    companyName: "Iconic Yatra",
    contactPerson: "Subham Baskar",
    call: "+917053900957",
    support: "+911202555001",
    email: "info@iconicyatra.com",
    address: "Noida, Uttar Pradesh, India - 201301",
    website: "https://www.iconicyatra.com",
    gst: "NA",
    about: "Iconic Yatra is the main online Tour operator Platform. We are tour packages specialist for Domestic and International both, offering a wide range of administrations that incorporate travel services need are the bundles given by our organisation in particular Domestic Tour Packages and International Tour Packages.",
    note: "This is only tentative schedule for sightseeing and travel. Actual sightseeing may get affected due to weather, road conditions, local authority notices, shortage of timing, or off days.",
    invoiceTerms: "This is invoice payment. Thanks for doing business with us!",
    pdfFooter: "https://www.iconicyatra.com/",
    currency: "Rupees (INR, ₹)",
    signature: "/logo192.png",
    qrCode: "/logo192.png",
    stats: {
      staff: "0/10",
      vendor: "0/10",
      agent: "0/10",
      referral: "0/10",
      client: "0/10",
    },
  });

  const menuItems = [
    { text: "Company Profile", icon: <BusinessIcon /> },
    { text: "Access & Permission", icon: <LockIcon /> },
    { text: "Email Notification", icon: <MailIcon /> },
    { text: "Account & Billing", icon: <AccountBalanceIcon /> },
    { text: "Banking & Status", icon: <AccountBalanceIcon /> },
    { text: "Terms & Condition", icon: <GavelIcon /> },
    { text: "Package", icon: <WorkIcon /> },
  ];

  const handleMenuItemClick = (text) => {
    setSelected(text);
  };

  const handleEditClick = (field, value) => {
    setEditDialog({
      open: true,
      field,
      value,
      tempValue: value
    });
  };

  const handleCloseDialog = () => {
    setEditDialog({ open: false, field: "", value: "" });
  };

  const handleUpdate = () => {
    const { field, tempValue } = editDialog;
    
    if (field.startsWith("stats.")) {
      const statField = field.split(".")[1];
      setCompanyData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: tempValue
        }
      }));
    } else {
      setCompanyData(prev => ({
        ...prev,
        [field]: tempValue
      }));
    }
    
    handleCloseDialog();
  };

  const handleTempValueChange = (event) => {
    setEditDialog(prev => ({
      ...prev,
      tempValue: event.target.value
    }));
  };

  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditDialog(prev => ({
          ...prev,
          tempValue: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordDialog;
    
    // Add your password validation logic here
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match!");
      return;
    }
    
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    // Add your API call to update password here
    console.log("Password change requested:", { currentPassword, newPassword });
    
    // Reset and close dialog
    setPasswordDialog({ open: false, currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordDialog(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFieldLabel = (field) => {
    const labels = {
      headerLogo: "Header Logo",
      footerLogo: "Footer Logo",
      companyName: "Company Name",
      contactPerson: "Contact Person Name",
      call: "Call",
      support: "Support",
      email: "Email",
      address: "Address",
      website: "Website",
      gst: "GST No",
      about: "About Company",
      note: "Initial Note",
      invoiceTerms: "Invoice Terms",
      pdfFooter: "Pdf & Web Footer",
      currency: "Currency",
      signature: "Signature",
      qrCode: "QR Code",
      "stats.staff": "Number Of Staff",
      "stats.vendor": "Number Of Vendor",
      "stats.agent": "Number Of Agent",
      "stats.referral": "Number Of Referral",
      "stats.client": "Number Of Client",
    };
    return labels[field] || field;
  };

  const renderEditField = () => {
    const { field, tempValue } = editDialog;

    if (field === "currency") {
      return (
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={tempValue}
            onChange={handleTempValueChange}
            label="Currency"
          >
            <MenuItem value="Rupees (INR, ₹)">Rupees (INR, ₹)</MenuItem>
            <MenuItem value="US Dollar (USD, $)">US Dollar (USD, $)</MenuItem>
            <MenuItem value="Euro (EUR, €)">Euro (EUR, €)</MenuItem>
            <MenuItem value="Pound (GBP, £)">Pound (GBP, £)</MenuItem>
          </Select>
        </FormControl>
      );
    }

    if (field === "about" || field === "note" || field === "invoiceTerms") {
      return (
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          value={tempValue}
          onChange={handleTempValueChange}
          variant="outlined"
        />
      );
    }

    if (field === "headerLogo" || field === "footerLogo" || field === "signature" || field === "qrCode") {
      return (
        <Box>
          <TextField
            fullWidth
            value={tempValue}
            onChange={handleTempValueChange}
            variant="outlined"
            placeholder="Enter image URL or upload file"
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Browse File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleFileUpload(e, field)}
            />
          </Button>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Preview:
            </Typography>
            <Avatar 
              src={tempValue} 
              sx={{ 
                width: field === "qrCode" ? 120 : 100, 
                height: field === "qrCode" ? 120 : field === "signature" ? 60 : 100,
                mx: 'auto',
                border: '1px solid #ddd'
              }} 
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              {field === "headerLogo" || field === "footerLogo" ? "Logo Preview" : 
               field === "signature" ? "Signature Preview" : "QR Code Preview"}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <TextField
        autoFocus
        fullWidth
        value={tempValue}
        onChange={handleTempValueChange}
        variant="outlined"
        type={field === "email" ? "email" : "text"}
      />
    );
  };

  const renderMainContent = () => {
    if (selected === "Banking & Status") {
      return <BankingStatus />;
    }

    return (
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#f57c00", mb: 2 }}>
          Company Profile
        </Typography>

        <Box mb={2}>
          <Typography variant="body2" fontWeight={500}>
            Change Password
          </Typography>
          <IconButton 
            size="small"
            onClick={() => setPasswordDialog({ ...passwordDialog, open: true })}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Logos */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={500}>Header Logo:</Typography>
            <Avatar src={companyData.headerLogo} alt="Header Logo" sx={{ width: 100, height: 100, my: 1 }} />
            <IconButton size="small" onClick={() => handleEditClick("headerLogo", companyData.headerLogo)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={500}>Footer Logo:</Typography>
            <Avatar src={companyData.footerLogo} alt="Footer Logo" sx={{ width: 100, height: 100, my: 1 }} />
            <IconButton size="small" onClick={() => handleEditClick("footerLogo", companyData.footerLogo)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Company Info */}
        <Box>
          {[
            ["companyName", companyData.companyName],
            ["contactPerson", companyData.contactPerson],
            ["call", companyData.call],
            ["support", companyData.support],
            ["email", companyData.email],
            ["address", companyData.address],
            ["website", companyData.website],
            ["gst", companyData.gst],
            ["about", companyData.about],
            ["note", companyData.note],
            ["invoiceTerms", companyData.invoiceTerms],
            ["pdfFooter", companyData.pdfFooter],
            ["currency", companyData.currency],
          ].map(([field, value]) => (
            <Box key={field} display="flex" alignItems="center" mb={1}>
              <Typography variant="body2" fontWeight={500} sx={{ width: 180 }}>
                {getFieldLabel(field)}:
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {value}
              </Typography>
              <IconButton 
                size="small" 
                sx={{ ml: 1 }}
                onClick={() => handleEditClick(field, value)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Signature and QR */}
        <Box>
          <Typography fontWeight={500}>Change Signature:</Typography>
          <Avatar src={companyData.signature} sx={{ width: 100, height: 60, my: 1 }} />
          <IconButton size="small" onClick={() => handleEditClick("signature", companyData.signature)}>
            <EditIcon fontSize="small" />
          </IconButton>

          <Typography fontWeight={500} mt={2}>
            UPI Payments - Upload QR Code:
          </Typography>
          <Avatar src={companyData.qrCode} sx={{ width: 120, height: 120, my: 1 }} />
          <IconButton size="small" onClick={() => handleEditClick("qrCode", companyData.qrCode)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Stats */}
        <Grid container spacing={2}>
          {Object.entries(companyData.stats).map(([key, value]) => (
            <Grid size={{xs:12, sm:6, md:4}} key={key}>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={500}>
                  {`Number Of ${key.charAt(0).toUpperCase() + key.slice(1)}:`}{" "}
                  <Typography component="span" color="text.secondary">
                    {value}
                  </Typography>
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ ml: 1 }}
                  onClick={() => handleEditClick(`stats.${key}`, value)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  selected={selected === item.text}
                  onClick={() => handleMenuItemClick(item.text)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      "& svg": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: selected === item.text ? "white" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 9 }} item>
          {renderMainContent()}
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {getFieldLabel(editDialog.field)}
        </DialogTitle>
        <DialogContent>
          {renderEditField()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog.open} onClose={() => setPasswordDialog({ ...passwordDialog, open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>
          Change Password
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Current Password"
            type="password"
            value={passwordDialog.currentPassword}
            onChange={(e) => handlePasswordInputChange("currentPassword", e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            type="password"
            value={passwordDialog.newPassword}
            onChange={(e) => handlePasswordInputChange("newPassword", e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm New Password"
            type="password"
            value={passwordDialog.confirmPassword}
            onChange={(e) => handlePasswordInputChange("confirmPassword", e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog({ ...passwordDialog, open: false })}>
            Cancel
          </Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyProfile;
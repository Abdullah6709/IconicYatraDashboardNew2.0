import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  TextField,
  Checkbox,
  Divider,
} from "@mui/material";

const SelectHotelVendorDialog = ({ open, onClose }) => {
  const [vendorType, setVendorType] = useState("single");
  const [vendors, setVendors] = useState([
    { id: 1, name: "Hotel Palm Bliss Barsey (2N)", same: false, vendorName: "" },
    { id: 2, name: "Tempo Heritage Resort Chungthang (2N)", same: false, vendorName: "" },
  ]);

  const handleVendorChange = (id, value) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, vendorName: value } : v))
    );
  };

  const handleSameChange = (id, checked) => {
    if (checked) {
      const sourceVendor = vendors.find((v) => v.id === id)?.vendorName || "";
      setVendors((prev) =>
        prev.map((v) => (v.id !== id ? { ...v, vendorName: sourceVendor } : v))
      );
    }
  };

  const handleConfirm = () => {
    console.log("Vendor selection:", { vendorType, vendors });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600, color: "#2196f3" }}>
        Select Hotel Vendor
      </DialogTitle>

      <DialogContent dividers>
        {/* Vendor Type */}
        <Typography sx={{ fontWeight: 600, mb: 1 }}>
          <span style={{ color: "red" }}>*</span> Vendor Type
        </Typography>
        <RadioGroup
          row
          value={vendorType}
          onChange={(e) => setVendorType(e.target.value)}
        >
          <FormControlLabel value="single" control={<Radio />} label="Single Vendor" />
          <FormControlLabel value="multiple" control={<Radio />} label="Multiple Vendor" />
        </RadioGroup>

        {/* Single Vendor Layout */}
        {vendorType === "single" && (
          <Box mt={2}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              <span style={{ color: "red" }}>*</span> Hotel Vendor
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                size="small"
                fullWidth
                placeholder="Hotel Vendor Name"
              />
              <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                Show All
              </Typography>
            </Box>

            <Box mt={1}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Add New
              </Typography>
            </Box>
          </Box>
        )}

        {/* Multiple Vendor Layout */}
        {vendorType === "multiple" && (
          <Box mt={2}>
            <Typography sx={{ fontWeight: 600, color: "#f57c00" }}>Deluxe</Typography>
            <Divider sx={{ mb: 2 }} />

            {vendors.map((hotel) => (
              <Box key={hotel.id} mb={2}>
                <Typography sx={{ fontWeight: 600 }}>
                  <span style={{ color: "red" }}>*</span> {hotel.name}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Checkbox
                    size="small"
                    checked={hotel.same}
                    onChange={(e) =>
                      handleSameChange(hotel.id, e.target.checked)
                    }
                  />
                  <Typography variant="body2">Same</Typography>
                </Box>

                <TextField
                  size="small"
                  fullWidth
                  placeholder="Hotel Vendor Name"
                  value={hotel.vendorName}
                  onChange={(e) => handleVendorChange(hotel.id, e.target.value)}
                />
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ minWidth: 100 }}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={onClose}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectHotelVendorDialog;

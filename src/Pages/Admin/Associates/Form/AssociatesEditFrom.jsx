import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

// ----- Static Data -----
const titles = ["Mr", "Mrs", "Ms", "Dr"];
const roles = [
  "B2B Vendor",
  "Hotel Vendor",
  "Referral Partner",
  "Staff",
  "Sub Agent",
  "Vehicle Vendor",
];
const firmTypesDefault = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Ltd",
  "Public Ltd",
];
const countries = ["India", "USA"];
const states = {
  India: ["Maharashtra", "Delhi", "Karnataka"],
  USA: ["California", "New York", "Texas"],
};
const cities = {
  Maharashtra: ["Mumbai", "Pune"],
  Delhi: ["New Delhi"],
  Karnataka: ["Bangalore"],
  California: ["Los Angeles", "San Francisco"],
  "New York": ["New York City"],
  Texas: ["Houston"],
};

// ----- Validation Schema -----
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  associateType: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  firmType: Yup.string().required("Required"),
  firmName: Yup.string().required("Required"),
});

const EditAssociateForm = ({ initialData = {}, onSubmit }) => {
  const [firmTypes, setFirmTypes] = React.useState(firmTypesDefault);

  const formik = useFormik({
    initialValues: {
      // Personal
      title: initialData.title || "",
      fullName: initialData.fullName || "",
      mobile: initialData.mobile || "",
      alternateContact: initialData.alternateContact || "",
      associateType: initialData.associateType || "",
      email: initialData.email || "",
      dob: initialData.dob ? dayjs(initialData.dob) : null,

      // Address
      country: initialData.country || "",
      state: initialData.state || "",
      city: initialData.city || "",
      address1: initialData.address1 || "",
      address2: initialData.address2 || "",
      address3: initialData.address3 || "",
      pincode: initialData.pincode || "",

      // Firm
      firmType: initialData.firmType || "",
      gstin: initialData.gstin || "",
      cin: initialData.cin || "",
      pan: initialData.pan || "",
      turnover: initialData.turnover || "",
      firmName: initialData.firmName || "",
      firmDescription: initialData.firmDescription || "",
      sameAsContact: initialData.sameAsContact || false,
      supportingDocs: initialData.supportingDocs || null,
      firmAddress1: initialData.firmAddress1 || "",
      firmAddress2: initialData.firmAddress2 || "",
      firmAddress3: initialData.firmAddress3 || "",

      // Bank
      bankName: initialData.bankName || "",
      branchName: initialData.branchName || "",
      accountHolderName: initialData.accountHolderName || "",
      accountNumber: initialData.accountNumber || "",
      ifscCode: initialData.ifscCode || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit?.(values);
    },
  });

  const { values, errors, touched, handleChange, setFieldValue } = formik;

  return (
    <Box p={3} component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Edit Associate Details
      </Typography>

      {/* ---- Personal Details ---- */}
      <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Title</InputLabel>
              <Select name="title" value={values.title} onChange={handleChange}>
                {titles.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={values.fullName}
              onChange={handleChange}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              name="mobile"
              label="Mobile"
              fullWidth
              value={values.mobile}
              onChange={handleChange}
              error={touched.mobile && Boolean(errors.mobile)}
              helperText={touched.mobile && errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              name="alternateContact"
              label="Alternate Contact"
              fullWidth
              value={values.alternateContact}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Associate Type</InputLabel>
              <Select
                name="associateType"
                value={values.associateType}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={values.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={values.dob}
                onChange={(d) => setFieldValue("dob", d)}
                format="DD-MM-YYYY"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      {/* ---- Location ---- */}
      <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Location
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name="country"
                value={values.country}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("state", "");
                  setFieldValue("city", "");
                }}
              >
                {countries.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                value={values.state}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("city", "");
                }}
                disabled={!values.country}
              >
                {(states[values.country] || []).map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                name="city"
                value={values.city}
                onChange={handleChange}
                disabled={!values.state}
              >
                {(cities[values.state] || []).map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* ---- Address ---- */}
      <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="address1"
              label="Address Line 1"
              fullWidth
              value={values.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="address2"
              label="Address Line 2"
              fullWidth
              value={values.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="address3"
              label="Address Line 3"
              fullWidth
              value={values.address3}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="pincode"
              label="Pincode"
              fullWidth
              value={values.pincode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* ---- Firm Details ---- */}
      <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Firm Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Firm Type</InputLabel>
              <Select
                name="firmType"
                value={values.firmType}
                onChange={handleChange}
              >
                {firmTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="firmName"
              label="Firm Name"
              fullWidth
              value={values.firmName}
              onChange={handleChange}
              error={touched.firmName && Boolean(errors.firmName)}
              helperText={touched.firmName && errors.firmName}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              name="gstin"
              label="GSTIN"
              fullWidth
              value={values.gstin}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              name="cin"
              label="CIN"
              fullWidth
              value={values.cin}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              name="pan"
              label="PAN"
              fullWidth
              value={values.pan}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="turnover"
              label="Turnover"
              fullWidth
              value={values.turnover}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="firmDescription"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={values.firmDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="sameAsContact"
                  checked={values.sameAsContact}
                  onChange={handleChange}
                />
              }
              label="Same as contact address"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ---- Bank Details ---- */}
      <Box border={1} borderColor="divider" borderRadius={2} p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Bank Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="bankName"
              label="Bank Name"
              fullWidth
              value={values.bankName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="branchName"
              label="Branch Name"
              fullWidth
              value={values.branchName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="accountHolderName"
              label="Account Holder Name"
              fullWidth
              value={values.accountHolderName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="accountNumber"
              label="Account Number"
              fullWidth
              value={values.accountNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="ifscCode"
              label="IFSC Code"
              fullWidth
              value={values.ifscCode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* ---- Submit ---- */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button type="submit" variant="contained">
          Update Associate
        </Button>
      </Box>
    </Box>
  );
};

export default EditAssociateForm;

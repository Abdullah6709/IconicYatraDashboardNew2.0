import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const gstOptions = [
  { label: "GST ON", value: "on" },
  { label: "Full", value: "full" },
  { label: "Margin", value: "margin" },
  { label: "None", value: "none" },
];

const taxRates = [0, 5, 12, 18, 28];

const QuotationMarginTaxesForm = () => {
  const formik = useFormik({
    initialValues: {
      standardPackageCost: "",
      companyMarginPercent: "",
      companyMarginValue: "",
      standardDiscount: "",
      gstType: "",
      taxPercent: "",
      contactDetails: "",
    },
    validationSchema: Yup.object({
      standardPackageCost: Yup.number()
        .required("Required")
        .positive("Must be positive"),
      gstType: Yup.string().required("Select a GST option"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Quotation : Margin & Taxes
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        {/* Purchase Cost */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Purchase Cost
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            fullWidth
            label="Standard Package Cost"
            name="standardPackageCost"
            value={formik.values.standardPackageCost}
            onChange={formik.handleChange}
            error={
              formik.touched.standardPackageCost &&
              Boolean(formik.errors.standardPackageCost)
            }
            helperText={
              formik.touched.standardPackageCost &&
              formik.errors.standardPackageCost
            }
          />
        </Box>

        {/* Company Margin */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Company Margin
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}}>
              <TextField
                fullWidth
                label="Company Standard Margin %"
                name="companyMarginPercent"
                value={formik.values.companyMarginPercent}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                fullWidth
                label="Company Standard Margin ₹"
                name="companyMarginValue"
                value={formik.values.companyMarginValue}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Discount */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Discount
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            fullWidth
            label="Standard Discount ₹"
            name="standardDiscount"
            value={formik.values.standardDiscount}
            onChange={formik.handleChange}
          />
        </Box>

        {/* Taxes */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Taxes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <RadioGroup
            row
            name="gstType"
            value={formik.values.gstType}
            onChange={formik.handleChange}
          >
            {gstOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {formik.touched.gstType && formik.errors.gstType && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {formik.errors.gstType}
            </Typography>
          )}

          <TextField
            select
            fullWidth
            sx={{ mt: 2 }}
            label="Tax %"
            name="taxPercent"
            value={formik.values.taxPercent}
            onChange={formik.handleChange}
          >
            {taxRates.map((rate) => (
              <MenuItem key={rate} value={rate}>
                {rate}%
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Signature Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Signature Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Contact Details"
            name="contactDetails"
            value={formik.values.contactDetails}
            onChange={formik.handleChange}
          />
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ px: 4 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuotationMarginTaxesForm;

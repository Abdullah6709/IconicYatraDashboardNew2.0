import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
} from "@mui/material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

import AddNewBank from "../Dialog/AddNewBank";

// Dropdown options
const accountTypes = ["Agent", "Supplier"];
const states = ["Maharashtra", "Gujarat", "Delhi"];
const taxOptions = ["0%", "5%", "12%", "18%", "28%"];
const paymentModes = ["Cash", "Credit Card", "Bank Transfer", "Cheque"];

const InvoiceForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentModeOptions, setPaymentModeOptions] = useState(paymentModes);

  const handleAddNewPaymentMode = (newMode) => {
    if (newMode && !paymentModeOptions.includes(newMode)) {
      setPaymentModeOptions([...paymentModeOptions, newMode]);
    }
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      accountType: "",
      partyName: "",
      billingName: "",
      billingAddress: "",
      gstin: "",
      invoiceNo: "I-202517",
      invoiceDate: "",
      dueDate: "",
      stateOfSupply: "",
      taxType: "withTax",
      isInternational: false,
      items: [
        {
          particulars: "",
          price: "",
          discountPercent: "",
          discount: "",
          taxPercent: "",
          taxAmount: "",
          amount: "",
        },
      ],
      paymentMode: "",
      referenceNo: "",
      note: "",
      invoiceValuePurchase: "",
      totalAmount: "",
      receivedAmount: "",
      balanceAmount: "",
    },
    validationSchema: Yup.object({
      accountType: Yup.string().required("Required"),
      partyName: Yup.string().required("Required"),
      billingName: Yup.string().required("Required"),
      items: Yup.array().of(
        Yup.object().shape({
          particulars: Yup.string().required("Required"),
          price: Yup.number()
            .typeError("Must be a number")
            .required("Required"),
          taxPercent: Yup.string().required("Required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Invoice submitted successfully!");
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Invoice
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Top Section */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} >
            <TextField
              select
              fullWidth
              label="Account Type"
              name="accountType"
              value={values.accountType}
              onChange={handleChange}
              error={touched.accountType && Boolean(errors.accountType)}
              helperText={touched.accountType && errors.accountType}
            >
              {accountTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Party Name"
              name="partyName"
              value={values.partyName}
              onChange={handleChange}
              error={touched.partyName && Boolean(errors.partyName)}
              helperText={touched.partyName && errors.partyName}
            >
              <MenuItem value="ABC Travels">ABC Travels</MenuItem>
              <MenuItem value="XYZ Traders">XYZ Traders</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              label="Invoice No"
              name="invoiceNo"
              value={values.invoiceNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              type="date"
              label="Invoice Date"
              name="invoiceDate"
              InputLabelProps={{ shrink: true }}
              value={values.invoiceDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Billing Name"
              name="billingName"
              value={values.billingName}
              onChange={handleChange}
              error={touched.billingName && Boolean(errors.billingName)}
              helperText={touched.billingName && errors.billingName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Billing Address"
              name="billingAddress"
              value={values.billingAddress}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="GSTIN Number"
              name="gstin"
              value={values.gstin}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              name="dueDate"
              InputLabelProps={{ shrink: true }}
              value={values.dueDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="State of Supply"
              name="stateOfSupply"
              value={values.stateOfSupply}
              onChange={handleChange}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isInternational"
                  checked={values.isInternational}
                  onChange={handleChange}
                />
              }
              label="International"
            />
          </Grid>
        </Grid>

        {/* Tax Type */}
        <RadioGroup
          row
          name="taxType"
          value={values.taxType}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <FormControlLabel
            value="withTax"
            control={<Radio />}
            label="With Tax"
          />
          <FormControlLabel
            value="withoutTax"
            control={<Radio />}
            label="Without Tax"
          />
        </RadioGroup>

        {/* Items Table */}
        <FormikProvider value={formik}>
          <FieldArray
            name="items"
            render={(arrayHelpers) => (
              <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Particulars</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Discount %</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Tax %</TableCell>
                      <TableCell>Tax Amount</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].particulars`}
                            value={item.particulars}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].price`}
                            value={item.price}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].discountPercent`}
                            value={item.discountPercent}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].discount`}
                            value={item.discount}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            select
                            name={`items[${index}].taxPercent`}
                            value={item.taxPercent}
                            onChange={handleChange}
                            fullWidth
                          >
                            {taxOptions.map((tax) => (
                              <MenuItem key={tax} value={tax}>
                                {tax}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].taxAmount`}
                            value={item.taxAmount}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`items[${index}].amount`}
                            value={item.amount}
                            onChange={handleChange}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box p={2}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      arrayHelpers.push({
                        particulars: "",
                        price: "",
                        discountPercent: "",
                        discount: "",
                        taxPercent: "",
                        taxAmount: "",
                        amount: "",
                      })
                    }
                  >
                    Add New
                  </Button>
                </Box>
              </TableContainer>
            )}
          />
        </FormikProvider>

        {/* Footer Fields */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="Payment Mode"
              name="paymentMode"
              value={values.paymentMode}
              onChange={handleChange}
            >
              {paymentModeOptions.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {mode}
                </MenuItem>
              ))}
              <MenuItem onClick={() => setOpenDialog(true)}>+ Add New</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Reference/Cash/Cheque No."
              name="referenceNo"
              value={values.referenceNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Additional Note"
              name="note"
              value={values.note}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Totals Section */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                label="Invoice Value Purchase"
                name="invoiceValuePurchase"
                value={values.invoiceValuePurchase}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                label="Total Amount"
                name="totalAmount"
                value={values.totalAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                label="Received Amount"
                name="receivedAmount"
                value={values.receivedAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                label="Balance Amount"
                name="balanceAmount"
                value={values.balanceAmount}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>

      <AddNewBank
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddNewPaymentMode}
      />
    </Box>
  );
};

export default InvoiceForm;

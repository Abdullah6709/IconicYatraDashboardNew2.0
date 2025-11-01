import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from '@mui/material';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TermsAndConditionsPage = () => {
  const formik = useFormik({
    initialValues: {
      // Terms & Conditions section
      sector: '',
      required: '',
      description1: '',
      description2: '',
      language: '',
      sectorArea: '',
      inclusion: '',
      
      // Status section
      temperature: '',
      famous: '',
      altitude: '',
      
      // Payment section
      paymentDetails: '',
      refundDetails: '',
      update: '',
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
      // Handle form submission here
    },
  });

  // React Quill configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'align'
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Terms & Conditions
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* Terms & Conditions Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Terms & Conditions
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sector"
                  name="sector"
                  value={formik.values.sector}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Required"
                  name="required"
                  value={formik.values.required}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Description 1
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ReactQuill
                    value={formik.values.description1}
                    onChange={(value) => formik.setFieldValue('description1', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ height: '150px' }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Description 2
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ReactQuill
                    value={formik.values.description2}
                    onChange={(value) => formik.setFieldValue('description2', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ height: '150px' }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Language"
                  name="language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sector Area"
                  name="sectorArea"
                  value={formik.values.sectorArea}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Inclusion
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ReactQuill
                    value={formik.values.inclusion}
                    onChange={(value) => formik.setFieldValue('inclusion', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ height: '120px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        {/* Status Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Temperature</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        fullWidth
                        name="temperature"
                        value={formik.values.temperature}
                        onChange={formik.handleChange}
                        variant="standard"
                        placeholder="Enter temperature"
                        InputProps={{ disableUnderline: true }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Famous
                </Typography>
                <TextField
                  fullWidth
                  name="famous"
                  value={formik.values.famous}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Altitude
                </Typography>
                <TextField
                  fullWidth
                  name="altitude"
                  value={formik.values.altitude}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        {/* Payment Details Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Payment Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ReactQuill
                    value={formik.values.paymentDetails}
                    onChange={(value) => formik.setFieldValue('paymentDetails', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ height: '150px' }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Refund Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ReactQuill
                    value={formik.values.refundDetails}
                    onChange={(value) => formik.setFieldValue('refundDetails', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ height: '150px' }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Required - Update
                </Typography>
                <TextField
                  fullWidth
                  name="update"
                  value={formik.values.update}
                  onChange={formik.handleChange}
                  variant="outlined"
                  size="small"
                  placeholder="Update information"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default TermsAndConditionsPage;
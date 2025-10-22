import React, { useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoicePDF = ({ invoiceData }) => {
  const componentRef = useRef();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const element = componentRef.current;
      
      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true, // For external images
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      let page = 1;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        page++;
      }

      // Download the PDF
      pdf.save(`Invoice-${invoiceData?.invoiceNo || 'INV'}-${invoiceData?.id || ''}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box>
      {/* Download Button */}
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          sx={{ mb: 2, minWidth: 160 }}
        >
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </Box>

      {/* Invoice Content */}
      <Box 
        ref={componentRef}
        sx={{ 
          backgroundColor: 'white',
          p: 2,
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            margin: "0 auto",
            p: 2,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Header with Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            {/* Logo Section */}
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src="https://iconicyatra.travserver.com/iconicyatra/uploads/logo/company/company_logo.jpg"
                alt="Company Logo"
                sx={{
                  maxWidth: 180,
                  maxHeight: 120,
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </Box>

            {/* Company Details */}
            <Box sx={{ flex: 2, textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#2c3e50", mb: 1 }}
              >
                INVOICE
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#34495e", mb: 1 }}
              >
                Iconic Yatra
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#7f8c8d", lineHeight: 1.4 }}
              >
                Nolds - 2013/01, Uttar Pradesh - India
                <br />
                Phone No.: +91705990957 Email Id: info@globersitour.com State: 9 -
                Uttar Pradesh
              </Typography>
            </Box>

            {/* Empty space for balance */}
            <Box sx={{ flex: 1 }}></Box>
          </Box>

          {/* Divider */}
          <Box sx={{ borderBottom: "2px solid #bdc3c7", mb: 3 }} />

          {/* Bill To and Invoice Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            {/* Bill To */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}
              >
                Affirm To
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #ecf0f1",
                          fontWeight: "bold",
                          width: "40%",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        {invoiceData?.name || "M. and Rumm"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Website No:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        9027015435
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Date:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        28 - Andhra Pradesh (DA)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Invoice Details */}
            <Box sx={{ flex: 1, ml: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}
              >
                Invoice Details
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #ecf0f1",
                          fontWeight: "bold",
                          width: "50%",
                        }}
                      >
                        Invoice No:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        {invoiceData?.invoiceNo || "INV-001"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Invoice Date:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        {invoiceData?.invoiceDate || "21/10/2025"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Due Date:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        {invoiceData?.dueDate || "05/11/2025"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Phone No:
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        10 38926
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* Items Table */}
          <Box sx={{ mb: 3 }}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
            >
              <Table>
                <TableBody>
                  {/* Table Header */}
                  <TableRow sx={{ backgroundColor: "#34495e" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid #2c3e50",
                      }}
                    >
                      Particulars
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid #2c3e50",
                      }}
                    >
                      HON/LAC
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid #2c3e50",
                        textAlign: "right",
                      }}
                    >
                      Price (₹)
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid #2c3e50",
                        textAlign: "right",
                      }}
                    >
                      Amount (₹)
                    </TableCell>
                  </TableRow>

                  {/* Table Data */}
                  <TableRow>
                    <TableCell
                      sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                    >
                      day
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ecf0f1" }}></TableCell>
                    <TableCell
                      sx={{ border: "1px solid #ecf0f1", textAlign: "right" }}
                    >
                      4,972
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #ecf0f1", textAlign: "right" }}
                    >
                      4,972
                    </TableCell>
                  </TableRow>

                  {/* Total Row */}
                  <TableRow sx={{ backgroundColor: "#ecf0f1" }}>
                    <TableCell
                      sx={{ border: "1px solid #bdc3c7", fontWeight: "bold" }}
                      colSpan={2}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #bdc3c7",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      4,972
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #bdc3c7",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      4,972
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Amount Summary */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Box sx={{ width: 300 }}>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Sub Total
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", textAlign: "right" }}
                      >
                        ₹ 4,972
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", textAlign: "right" }}
                      >
                        ₹ 4,972
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Received
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", textAlign: "right" }}
                      >
                        ₹ {invoiceData?.received?.replace('₹', '') || '2'}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#e74c3c", color: "white" }}>
                      <TableCell
                        sx={{ border: "1px solid #c0392b", fontWeight: "bold" }}
                      >
                        Balance
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #c0392b",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        ₹ {invoiceData?.balance?.replace('₹', '') || '4,972'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* Amount in Words and Terms */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            {/* Amount in Words */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}
              >
                Invoice Amount in Words
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #ecf0f1", fontWeight: "bold" }}
                      >
                        Four Thousand Nine Hundred Seventy Two Only
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Terms and Conditions */}
            <Box sx={{ flex: 1, ml: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}
              >
                Terms and conditions
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #ecf0f1" }}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #ecf0f1" }}>
                        This is invoice payment. Thanks for doing business with us!
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* Footer with Logo */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* Footer Logo */}
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src="https://iconicyatra.travserver.com/iconicyatra/uploads/logo/company/company_logo.jpg"
                alt="Footer Logo"
                sx={{
                  maxWidth: 180,
                  maxHeight: 120,
                  objectFit: "contain",
                  opacity: 0.7,
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </Box>

            {/* Signature Section */}
            <Box sx={{ flex: 1, textAlign: "right" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                F.K., Olika Vallana
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Iconic Yatra
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                Authorised Signatory
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoicePDF;
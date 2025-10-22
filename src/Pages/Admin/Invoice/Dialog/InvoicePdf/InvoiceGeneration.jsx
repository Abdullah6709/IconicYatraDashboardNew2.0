import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import InvoicePDF from '../InvoicePdf/InvoicePDF';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const InvoiceGeneration = () => {
  const { id } = useParams();
  const location = useLocation();
  const invoiceData = location.state?.invoiceData;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container maxWidth="lg">
      <Box py={3}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="outlined" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Print Invoice
          </Button>
        </Box>
        
        <Box ref={componentRef}>
          <InvoicePDF invoiceData={invoiceData} />
        </Box>
      </Box>
    </Container>
  );
};

export default InvoiceGeneration;
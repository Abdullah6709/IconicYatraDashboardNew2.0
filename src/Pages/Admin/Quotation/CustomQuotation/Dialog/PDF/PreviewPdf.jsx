import React, { useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const QuotationPDF = () => {
  const printRef = useRef();

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Mr_Anuj_Kumar_94.pdf");
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </Box>

      <Box ref={printRef} sx={{ backgroundColor: "#fff", p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Kind Attention: Mr Anuj Kumar
        </Typography>
        <Typography variant="subtitle1">India</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body2" paragraph>
          Globe Visitors is the main online Tour operator Platform. We are tour
          packages specialist for Domestic and International both, offering a
          wide range of administrations that incorporate travel services need
          are the bundles given by our organisation in particular Domestic Tour
          Packages and International Tour Packages.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Pickup/Drop Details
        </Typography>
        <Typography variant="body2">
          This Quotation is valid For the period 21/10/2025 to 05/11/2025
        </Typography>
        <Typography variant="body2">Arrival: Siliguri (24/02/2025)</Typography>
        <Typography variant="body2">Departure: Siliguri (01/03/2025)</Typography>
        <Typography variant="body2" mt={1}>
          Destination: 1N Aritar, 4N Baba Mandir
        </Typography>

        <Typography variant="body2" paragraph mt={1}>
          Sikkim is a state in northeast India, bordered by Bhutan, Tibet and
          Nepal. Part of the Himalayas, the area has a dramatic landscape that
          includes India’s highest mountain, 8,586m Kangchenjunga.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Day Wise Itinerary
        </Typography>
        {["Day1", "2", "3", "4", "5", "6"].map((day, i) => (
          <Typography key={i} variant="body2">
            Day {i + 1} ({24 + i}/02/2025): {day}
          </Typography>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Package Details
        </Typography>
        <Typography variant="body2">
          No of Guest: 4 Adults, 2 Kids With Bed (1-6 Years)
        </Typography>
        <Typography variant="body2">No of Rooms: 1 bed room</Typography>
        <Typography variant="body2">Meal Plan: CP</Typography>
        <Typography variant="body2" mb={1}>
          Vehicle Details: ERTIGA (Pickup: 24/02/2025 - Drop: 01/03/2025)
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>Nights</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>Deluxe</TableCell>
                <TableCell>Superior</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Aritar</TableCell>
                <TableCell>1 N</TableCell>
                <TableCell>₹ 4,410</TableCell>
                <TableCell>₹ 4,872</TableCell>
                <TableCell>₹ 7,875</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Baba Mandir</TableCell>
                <TableCell>4 N</TableCell>
                <TableCell>₹ 4,409</TableCell>
                <TableCell>₹ 4,872</TableCell>
                <TableCell>₹ 7,875</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Inclusion Policy
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 3 }}>
          <li>Sightseeing on point to point basis fixed route itinerary.</li>
          <li>Stay in double bed room in mentioned / similar hotel.</li>
          <li>Meal plan: MAP (Breakfast and Dinner).</li>
          <li>All transfers sightseeing in Wagon R or Sumo/Bolero.</li>
          <li>Cab strictly on point to point basis.</li>
          <li>Local Hotel Taxes.</li>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Exclusion Policy
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 3 }}>
          <li>Air Fare / Train fare.</li>
          <li>Personal expenses (Laundry, tips, etc.).</li>
          <li>Entry fees, Camera, Guide charges.</li>
          <li>Additional or incremental expenses due to natural causes.</li>
          <li>Room Heater charges not included.</li>
          <li>GST invoice must be informed at confirmation time.</li>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Payment Policy
        </Typography>
        <Typography variant="body2" paragraph>
          * 20% payment of package cost at reservation time + 100% Flight/Train
          cost.
          <br />
          * 60% payment after booking confirmation mail.
          <br />
          * Remaining after hotel confirmation mail.
          <br />
          * GST (5%) applicable on all bookings.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Cancellation & Refund
        </Typography>
        <Typography variant="body2" paragraph>
          1. Before 30 days: 30% retained. <br />
          2. Within 8–29 days: 50% retained. <br />
          3. Within 7 days or No Show: No refund.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Terms & Conditions
        </Typography>
        <Typography variant="body2" paragraph>
          Above is just a Quote & No Confirmation yet. Hotel check-in at 12 PM
          and checkout at 10 AM. Please carry Original Photo ID. Vehicle provided
          on point-to-point basis only.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2">
          <strong>Thanks & Regards,</strong>
          <br />
          Subham Baskar +91 70539 00957 (Noida)
          <br />
          Globe Visitors, Office No. 15, Bhawani Market Sec 27, Noida, Uttar
          Pradesh - 201301
          <br />
          <a href="https://www.globevisitors.com" target="_blank" rel="noreferrer">
            www.globevisitors.com
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default QuotationPDF;

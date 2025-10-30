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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";

const CompanyProfile = () => {
  const [selected, setSelected] = useState("Company Profile");

  const menuItems = [
    { text: "Company Profile", icon: <BusinessIcon /> },
    { text: "Access & Permission", icon: <LockIcon /> },
    { text: "Email Notification", icon: <MailIcon /> },
    { text: "Account & Billing", icon: <AccountBalanceIcon /> },
    { text: "Banking & Status", icon: <AccountBalanceIcon /> },
    { text: "Terms & Condition", icon: <GavelIcon /> },
    { text: "Package", icon: <WorkIcon /> },
  ];

  const companyData = {
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
    about:
      "Iconic Yatra is the main online Tour operator Platform. We are tour packages specialist for Domestic and International both, offering a wide range of administrations that incorporate travel services need are the bundles given by our organisation in particular Domestic Tour Packages and International Tour Packages.",
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
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }} >
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  selected={selected === item.text}
                  onClick={() => setSelected(item.text)}
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
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#f57c00", mb: 2 }}>
              Company Profile
            </Typography>

            <Box mb={2}>
              <Typography variant="body2" fontWeight={500}>
                Change Password
              </Typography>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Logos */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontWeight={500}>Header Logo:</Typography>
                <Avatar src={companyData.headerLogo} alt="Header Logo" sx={{ width: 100, height: 100, my: 1 }} />
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontWeight={500}>Footer Logo:</Typography>
                <Avatar src={companyData.footerLogo} alt="Footer Logo" sx={{ width: 100, height: 100, my: 1 }} />
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Company Info */}
            <Box>
              {[
                ["Company Name", companyData.companyName],
                ["Contact Person Name", companyData.contactPerson],
                ["Call", companyData.call],
                ["Support", companyData.support],
                ["Email", companyData.email],
                ["Address", companyData.address],
                ["Website", companyData.website],
                ["GST No", companyData.gst],
                ["About Company", companyData.about],
                ["Initial Note", companyData.note],
                ["Invoice Terms", companyData.invoiceTerms],
                ["Pdf & Web Footer", companyData.pdfFooter],
                ["Currency", companyData.currency],
              ].map(([label, value]) => (
                <Box key={label} display="flex" alignItems="center" mb={1}>
                  <Typography variant="body2" fontWeight={500} sx={{ width: 180 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                  <IconButton size="small" sx={{ ml: 1 }}>
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
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>

              <Typography fontWeight={500} mt={2}>
                UPI Payments - Upload QR Code:
              </Typography>
              <Avatar src={companyData.qrCode} sx={{ width: 120, height: 120, my: 1 }} />
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Stats */}
            <Grid container spacing={2}>
              {Object.entries(companyData.stats).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Typography variant="body2" fontWeight={500}>
                    {`Number Of ${key.charAt(0).toUpperCase() + key.slice(1)}:`}{" "}
                    <Typography component="span" color="text.secondary">
                      {value}
                    </Typography>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyProfile;

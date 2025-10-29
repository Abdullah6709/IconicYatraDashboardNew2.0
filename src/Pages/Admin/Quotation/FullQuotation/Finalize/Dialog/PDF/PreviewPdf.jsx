import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';

const ConfirmationVoucher = () => {
  // Sample data - you can replace this with dynamic data
  const voucherData = {
    refNumber: '102',
    date: '29/10/2025',
    customerName: 'Mrs Hema Madhuri',
    location: 'Gangtok, Sikkim, India',
    companyName: 'Iconic Yatra',
    arrival: {
      date: '25/11/2023',
      location: 'Siliguri Airport'
    },
    departure: {
      date: '29/11/2023',
      location: 'Siliguri from Hotel Directly'
    },
    itinerary: [
      {
        day: 1,
        date: '25/11/2025',
        from: 'Siliguri Airport',
        to: 'Baba Mandir',
        activities: ['Tribute to Baba Harbhajan Singh']
      },
      {
        day: 2,
        date: '26/11/2025',
        from: 'Baba Mandir',
        to: 'Baba Mandir',
        activities: ['Local SightSeeing At Baba Mandir']
      },
      {
        day: 3,
        date: '27/11/2025',
        from: 'Baba Mandir',
        to: 'Damthang',
        activities: ['Trekking hub, near Tendong Hill']
      },
      {
        day: 4,
        date: '28/11/2025',
        from: 'Damthang',
        to: 'Damthang',
        activities: ['Local SightSeeing At Damthang']
      },
      {
        day: 5,
        date: '29/11/2025',
        from: 'Damthang',
        to: 'Siliguri',
        activities: ['Departure to Siliguri']
      }
    ],
    guestDetails: {
      adults: 3,
      children: 2,
      childrenAge: '6-12 Years',
      rooms: '1 bedroom with 2 extra mattress',
      vehicle: 'ETiOS (Pickup: 25/11/2023 - Drop: 29/11/2023)'
    },
    hotelDetails: [
      {
        checkIn: '25/11/2025',
        destination: 'Baba Mandir',
        nights: '2 N',
        hotel: 'Yovage The Aryan Regency',
        meal: 'CP',
        roomType: 'Standard rooms'
      },
      {
        checkIn: '27/11/2025',
        destination: 'Damthang',
        nights: '2 N',
        hotel: 'Yovage The Aryan Regency',
        meal: 'EP',
        roomType: 'Standard rooms'
      }
    ],
    inclusions: [
      'Sightseeing on point to point basis fixed route itinerary.',
      'Stay in double bed room in mentioned / similar hotel.',
      'Meal plan : MAP (Breakfast and Dinner).',
      'All transfers sightseeing shall be done in a Wagon R cab for 2-3 Pax / Sumo / Bolero for 4 to 8 persons',
      'Cab / Vehicle shall be available strictly on point to point basis (Not on disposal).',
      'Local Hotel Taxes.'
    ],
    exclusions: [
      'Air Fare / Train fare.',
      'Expenses of personal nature such as Laundry, telephone calls, tips. Liquor, Mineral water, Airport Tax, Insurance, Meal outside hotel, Refreshment on arrival.',
      'Entry to Park and Monuments, Camera Charges, Guide or escort charges Additional car usage beyond itinerary',
      'Any supplementary service not mentioned in itinerary or mentioned in itinerary as a suggested addition such as Ropeway ride, Boating, Yak Ride, Ratting, Toy Train Ride, Helicopter ride or any similar activity.',
      'Additional or incremental expenses arising out of acts of god, lockdown, pandemic outbreak, political disturbance, strike etc.',
      'Any change in government tax structure and amount becoming due thereto.',
      'Room Heater charges not included, guest can take heaters on extra payment to hotel directly.',
      'Any extra chargeable sightseeing or trips, usage of payable services at resorts / hotels, sightseeing which are not mentioned in the itinerary.',
      'If require GST invoice then pl inform us at confirmation time only, later any change is not possible.'
    ],
    paymentPolicy: [
      'A non-refundable amount of 20% of package cost with GST(5%) (Domestic and International separately) starts after the first payment is done.',
      '20% payment of package cost at the time of Reservation + 100% Flight/Train Cost.',
      '60% payment of total package cost After receiving Booking confirmation mail from the Company.',
      'Pay the rest amount after receiving the Hotel Booking Confirmation mail.',
      'Copies of the visa/ID confirmation for International/Domestic visit separately.',
      'GST(5%) charges apply on all bookings.'
    ],
    cancellationPolicy: [
      'Before 30 days of tour start date: 30% of the tour cost shall be retained as charges.',
      'Within 08 to 29 days of tour start date: 50% of the tour cost shall be retained as charges.',
      'Within 07 days of tour start date: No refunds, Full tour cost shall be retained as charges.',
      'No Show on Tour: No refunds, Full tour cost shall be retained as charges.'
    ],
    contactInfo: {
      company: 'Iconic Yatra',
      representative: 'Subham Baskar',
      phone: '+917053900957 (Noida)',
      address: 'Office No 15, Bhawani Market Sec 27, Noida, Uttar Pradesh - 201301',
      website: 'https://www.iconicyatra.com'
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1200, margin: 'auto', fontFamily: 'Arial' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {/* Replace with your actual logo */}
        <Box 
          sx={{ 
            height: 80, 
            width: 200, 
            backgroundColor: '#f0f0f0', 
            margin: '0 auto 2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #ccc'
          }}
        >
          <Typography variant="h6" color="textSecondary">
            COMPANY LOGO
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {voucherData.companyName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Tour Operator Platform
        </Typography>
      </Box>

      {/* Reference and Date */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body1">
          <strong>Ref.:</strong> {voucherData.refNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {voucherData.date}
        </Typography>
      </Box>

      {/* Confirmation Voucher Title */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Confirmation Voucher
        </Typography>
      </Box>

      {/* Customer Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Kind Attention
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {voucherData.customerName}
          </Typography>
          <Typography variant="body1">
            {voucherData.location}
          </Typography>
        </CardContent>
      </Card>

      {/* About Us Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          {voucherData.companyName} is the main online Tour operator Platform. We are tour packages specialist for
          Domestic and International both, offering a wide range of administrations that incorporate
          travel services need are the bundles given by our organisation in particular Domestic Tour
          Packages and International Tour Packages.
        </Typography>
      </Box>

      {/* Pickup/Drop Details */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{xs:12, md:6}} >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Arrival
              </Typography>
              <Typography variant="body1">
                {voucherData.arrival.location} ({voucherData.arrival.date}) at Airport
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Departure
              </Typography>
              <Typography variant="body1">
                {voucherData.departure.location} ({voucherData.departure.date}) from Hotel Directly
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Full Quotation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Full Quotation
        </Typography>
        <Typography variant="body1" paragraph>
          Destination: 2N Baba Mandir, 2N Damthang
        </Typography>
        <Typography variant="body1" paragraph>
          Sikkim is a state in northeast India, bordered by Bhutan, Tibet and Nepal. Part of the
          Himalayas, the area has a dramatic landscape that includes India's highest mountain,
          8,586m Kangchenjunga.
        </Typography>
      </Box>

      {/* Day Wise Itinerary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Day Wise Itinerary
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          This is only tentative schedule for sightseeing and travel. Actual sightseeing may get
          affected due to weather, road conditions, local authority notices, shortage of timing, or off
          days.
        </Typography>

        {voucherData.itinerary.map((day, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Day {day.day} ({day.date}): {day.from} – {day.to}
              </Typography>
              {day.activities.map((activity, activityIndex) => (
                <Typography key={activityIndex} variant="body2" paragraph>
                  {activity}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Facts About Sikkim */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Facts About Sikkim
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Temperature:</strong> Min. Temperature °C (°F) 5.6 °C (42.1) °F 10.4 °C (50.8) °F Max.
            Temperature °C (°F) 13.4 °C (56.2) °F 17.3 °C (63.1) °F
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Languages:</strong> English, Hindi, Nepalese
          </Typography>
          <Typography variant="body2">
            <strong>Famous Location:</strong> Gangtok, Tsomgo Lake, Baba Mandir and Nathula Pass, 
            Lachung / Yumthang Valley / Zero Point. Lachen, Chopta valley, Gurudongmar Lake. 
            Pelling Namchi. ... Ravangla. ... Zuluk.
          </Typography>
        </CardContent>
      </Card>

      {/* Tour Confirmation Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Tour Confirmation Details
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{xs:12, md:6}}>
            <Typography variant="body1">
              <strong>No of Guest:</strong> {voucherData.guestDetails.adults} Adults, {voucherData.guestDetails.children} Childs ({voucherData.guestDetails.childrenAge})
            </Typography>
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Typography variant="body1">
              <strong>No of Rooms:</strong> {voucherData.guestDetails.rooms}
            </Typography>
          </Grid>
          <Grid size={{xs:12}}>
            <Typography variant="body1">
              <strong>Vehicle Details:</strong> {voucherData.guestDetails.vehicle}
            </Typography>
          </Grid>
        </Grid>

        {/* Hotel Details Table */}
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Check In Date</strong></TableCell>
                <TableCell><strong>Destination</strong></TableCell>
                <TableCell><strong>Nights</strong></TableCell>
                <TableCell><strong>Standard Hotels</strong></TableCell>
                <TableCell><strong>Meal</strong></TableCell>
                <TableCell><strong>Room Confirmed</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voucherData.hotelDetails.map((hotel, index) => (
                <TableRow key={index}>
                  <TableCell>{hotel.checkIn}</TableCell>
                  <TableCell>{hotel.destination}</TableCell>
                  <TableCell>{hotel.nights}</TableCell>
                  <TableCell>{hotel.hotel}</TableCell>
                  <TableCell>{hotel.meal}</TableCell>
                  <TableCell>{hotel.roomType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Inclusion Policy */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Inclusion Policy
        </Typography>
        <List dense>
          {voucherData.inclusions.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Please note: Hotel rooms & Vehicle is non AC at all hillstations.
        </Typography>
      </Box>

      {/* Exclusion Policy */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Exclusion Policy
        </Typography>
        <List dense>
          {voucherData.exclusions.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Payment Policy */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment Policy
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>ICONIC YATRA.com</strong> at its sole discretion maintains whatever authority is needed to change the terms and condition with or without earlier notification.
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Booking & Payment policy of ICONIC YATRA.com:
        </Typography>
        <List dense>
          {voucherData.paymentPolicy.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Cancellation & Refund */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cancellation & Refund
        </Typography>
        <List dense>
          {voucherData.cancellationPolicy.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer Contact Information */}
      <Box sx={{ textAlign: 'center', mt: 4, p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          Thanks & Regards,
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {voucherData.contactInfo.company}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {voucherData.contactInfo.representative} {voucherData.contactInfo.phone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {voucherData.contactInfo.address}
        </Typography>
        <Typography variant="body1">
          {voucherData.contactInfo.website}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ConfirmationVoucher;
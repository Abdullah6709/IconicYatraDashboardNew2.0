import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import LeadCard from "../Pages/Admin/Lead/LeadCard";
import LeadForm from "../Pages/Admin/Lead/Form/LeadFormStep1";
import LeadEditForm from "../Pages/Admin/Lead/Form/LeadEditForm";
import HotelCard from "../Pages/Admin/Hotel/HotelCard";
import HotelForm from "../Pages/Admin/Hotel/Form/HotelForm";
import HotelEditForm from "../Pages/Admin/Hotel/Form/HotelEditForm";
import PackageCard from "../Pages/Admin/TourPackage/PackageCard";
import PackageForm from "../Pages/Admin/TourPackage/Form/PackageForm";
import PackageEditForm from "../Pages/Admin/TourPackage/Form/PackageEditForm";
import AssociatesCard from "../Pages/Admin/Associates/AssociatesCard";
import AssociatesFormStep1 from "../Pages/Admin/Associates/Form/AssociatesFormStep1";
import AssociatesEditFrom from "../Pages/Admin/Associates/Form/AssociatesEditFrom";
import StaffCard from "../Pages/Admin/Staff/StaffCard";
import StaffForm from "../Pages/Admin/Staff/Form/StaffForm";
import QuotationCard from "../Pages/Admin/Quotation/QuotationCard";
import VehicleQuotation from "../Pages/Admin/Quotation/VehicleQuotation/VehicleQuotation";
import HotelQuotation from "../Pages/Admin/Quotation/HotelQuotation/hotelquotation";
import FlightQuotation from "../Pages/Admin/Quotation/FlightQuotation/flightquotation";
import QuickQuotation from "../Pages/Admin/Quotation/QuickQuotation/quickquotation";
import FullQuotation from "../Pages/Admin/Quotation/FullQuotation/fullquotation";
import CustomQuotation from "../Pages/Admin/Quotation/CustomQuotation/customquotation";
import FlightFinalize from "../Pages/Admin/Quotation/FlightQuotation/FlightFinalize";
import VehicleFinalize from "../Pages/Admin/Quotation/VehicleQuotation/VehicleFinalize";
import HotelFinalize from "../Pages/Admin/Quotation/HotelQuotation/HotelFinalize";
import CustomFinalize from "../Pages/Admin/Quotation/CustomQuotation/CustomFinalize";
import StaffEditForm from "../Pages/Admin/Staff/Form/StaffEditForm";
import StaffViewForm from "../Pages/Admin/Staff/Form/StaffViewForm";
import InvoiceCard from "../Pages/Admin/Invoice/InvoiceCard";
import InvoiceForm from "../Pages/Admin/Invoice/Form/InvoiceForm";
import InvoiceEditForm from "../Pages/Admin/Invoice/Form/InvoiceEditForm";
import InvoiceGeneration from "../Pages/Admin/Invoice/Dialog/InvoicePdf/InvoiceGeneration";
import FullQuotationFinalize from "../Pages/Admin/Quotation/FullQuotation/Finalize/FullQuotationFinalize";
const MainRoute = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Lead Routing */}
        <Route path="/lead" element={<LeadCard />} />
        <Route path="/leadform" element={<LeadForm />} />
        <Route path="/lead/leadeditform" element={<LeadEditForm />} />

        {/*Hotel Routing */}
        <Route path="/hotel" element={<HotelCard />} />
        <Route path="/hotelform" element={<HotelForm />} />
        <Route path="/hotel/hoteleditform" element={<HotelEditForm />} />

        {/* Quotation Routing */}
        <Route path="/quotation" element={<QuotationCard />} />
        <Route path="/vehiclequotation" element={<VehicleQuotation />} />
        <Route path="/hotelquotation" element={<HotelQuotation />} />
        <Route path="/flightquotation" element={<FlightQuotation />} />
        <Route path="/quickquotation" element={<QuickQuotation />} />
        <Route path="/fullquotation" element={<FullQuotation />} />
        <Route path="/customquotation" element={<CustomQuotation />} />

        <Route path="/flightfinalize" element={<FlightFinalize />} />
        <Route path="/vehiclefinalize" element={<VehicleFinalize />} />
        <Route path="/hotelfinalize" element={<HotelFinalize />} />
        <Route path="/customfinalize" element={<CustomFinalize />} />
        <Route path="/fullfinalize" element={<FullQuotationFinalize />} />

        {/* Package Routing */}
        <Route path="/tourpackage" element={<PackageCard />} />
        <Route path="/packageform" element={<PackageForm />} />
        <Route
          path="/tourpackage/packageeditform"
          element={<PackageEditForm />}
        />

        {/* Associates Route */}
        <Route path="/associates" element={<AssociatesCard />} />
        <Route path="/associatesform" element={<AssociatesFormStep1 />} />
        <Route
          path="/associates/associateseditform"
          element={<AssociatesEditFrom />}
        />

        {/* Staff Route */}
        <Route path="/staff" element={<StaffCard />} />
        <Route path="/staffform" element={<StaffForm />} />
        <Route path="/staff/staffeditform" element={<StaffEditForm />} />
        <Route path="/staff/viewstaffform" element={<StaffViewForm />} />


        {/* Invoice Routing  */}

        <Route path="/invoice" element={<InvoiceCard />} />
        <Route path="/invoiceform" element={<InvoiceForm />} />
        <Route path="/invoice/edit" element={<InvoiceEditForm />} />
         <Route path="/invoice/generate/:id" element={<InvoiceGeneration />} />

        {/* <Route path="/customquotationstep5" element={<CustomQuotationStep5 />} /> */}
      </Routes>
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};
export default MainRoute;

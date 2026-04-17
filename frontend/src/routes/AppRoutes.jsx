import MainLayout from "../layouts/MainLayout";
import Landing from "../pages/landing/Landing";

import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyOTP from "../features/auth/pages/VerifyOTP";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

import DashboardLayout from "../layouts/DashboardLayout";

import NotFound from "../pages/NotFound";

// USER
import Dashboard from "../features/user/pages/Dashboard";
import MyVehicles from "../features/vehicle/pages/MyVehicles";
import AddVehicle from "../features/vehicle/pages/AddVehicle";
import MyBookings from "../features/booking/pages/MyBookings";
import CreateBooking from "../features/booking/pages/CreateBooking";

// ADMIN
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AllBookings from "../features/admin/pages/AllBookings";
import AssignMechanic from "../features/admin/pages/AssignMechanic";
import AcceptedBookings from "../features/admin/pages/AcceptedBookings";
import RejectedBookings from "../features/admin/pages/RejectedBookings";
import CompletedBookings from "../features/admin/pages/CompletedBookings";

// MECHANIC
import MechanicJobs from "../features/mechanic/pages/MechanicJobs";
import JobDetails from "../features/mechanic/pages/JobDetails";

import Diagnose from "../features/ai/pages/Diagnose";

import Invoice from "../features/payment/pages/Invoice";
import PaymentSuccess from "../features/payment/pages/PaymentSuccess";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 🔥 LANDING */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Landing />} />
                </Route>

                {/* AUTH */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                {/* USER */}
                <Route
                    element={
                        <ProtectedRoute role="user">
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vehicles" element={<MyVehicles />} />
                    <Route path="/add-vehicle" element={<AddVehicle />} />
                    <Route path="/bookings" element={<MyBookings />} />
                    <Route path="/create-booking" element={<CreateBooking />} />
                    <Route path="/ai-diagnose" element={<Diagnose />} />
                    <Route path="/invoice/:bookingId" element={<Invoice />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                </Route>

                {/* ADMIN */}
                <Route
                    element={
                        <ProtectedRoute role="admin">
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/bookings" element={<AllBookings />} />
                    <Route path="/admin/bookings/accepted" element={<AcceptedBookings />} />
                    <Route path="/admin/bookings/rejected" element={<RejectedBookings />} />
                    <Route path="/admin/bookings/completed" element={<CompletedBookings />} />
                    <Route path="/admin/assign" element={<AssignMechanic />} />
                </Route>

                {/* MECHANIC */}
                <Route
                    element={
                        <ProtectedRoute role="mechanic">
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/mechanic/jobs" element={<MechanicJobs />} />
                    <Route path="/mechanic/job/:id" element={<JobDetails />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};


export default AppRoutes;
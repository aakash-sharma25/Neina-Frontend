"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import EventCard from "./EventCard";

const DisplayBooking = ({ bookings, removeBooking, loading }) => {
  const deleteBooking = async (bookingId) => {
    try {
      const { data } = await axios.delete(
        `https://neina-backend-km11.onrender.com/api/booking/${bookingId}`
      );

      if (data.success) {
        alert("Booking deleted successfully!");
        removeBooking(bookingId);
      } else {
        alert("Failed to delete booking:", data.message);
      }
    } catch (error) {
      alert("error");
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>

      {loading && <CircularProgress />}

      <EventCard bookings={bookings} deleteBooking={deleteBooking} />
    </Box>
  );
};

export default DisplayBooking;

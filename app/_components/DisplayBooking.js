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

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
        {bookings?.map((booking) => (
          <Card key={booking._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h6">Name: {booking.name}</Typography>
              <Typography>Date: {booking.date}</Typography>
              <Typography>Time: {booking.time}</Typography>
              <Typography>Guests: {booking.guest}</Typography>
              <Typography>Contact: {booking.contact}</Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteBooking(booking._id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DisplayBooking;

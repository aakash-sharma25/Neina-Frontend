"use client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function EventCard({ bookings, deleteBooking }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
      {bookings?.map((booking) => (
        <Card key={booking._id} sx={{ width: 300 ,padding:3 }}>
          <CardContent>
            <Typography variant="h6">Name: {booking.name}</Typography>
            <Typography>Date: {booking.date}</Typography>
            <Typography>Time: {booking.time}</Typography>
            <Typography>Guests: {booking.guest}</Typography>
            <Typography>Contact: {booking.contact}</Typography>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
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
  );
}

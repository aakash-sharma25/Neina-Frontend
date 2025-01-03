"use client";
import React, { useState, useEffect } from "react";
import AddEvents from "./_components/AddEvents";
import DisplayBooking from "./_components/DisplayBooking";
import axios from "axios";
import { AppBar, Box, Toolbar } from "@mui/material";
import Header from "./_components/Header";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://neina-backend-km11.onrender.com/api/booking"
      );
      if (data.success) {
        setBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      alert("error");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

  const removeBooking = (bookingId) => {
    setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Header/>
      <AddEvents addBooking={addBooking} />
      <div>
        <DisplayBooking
          bookings={bookings}
          removeBooking={removeBooking}
          loading={loading}
        />
      </div>
    </>
  );
}

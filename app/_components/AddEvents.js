"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const AddEvents = ({ addBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    guest: "",
    slot: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  const fetchAvailableSlots = async () => {
    try {
      const { data } = await axios.get(
        "https://neina-backend-km11.onrender.com/api/booking/availability"
      );
      if (data.success) {
        setAvailableSlots(data.availableSlots);
      } else {
        alert("Failed to fetch available slots");
      }
    } catch (error) {
      alert("error");
      console.error("Error fetching available slots:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.name.trim() === "") {
        alert("Name is required");
        return;
      }
      if (formData.contact.length < 10) {
        alert("Contact is required");
        return;
      }
      if (formData.guest === "" || formData.guest <= 0) {
        alert("Guests must be at least 1");
        return;
      }
      if (formData.slot === "") {
        alert("Slot is required");
        return;
      }

      const [date, time] = formData.slot.split(" ");
      const { data } = await axios.post(
        "https://neina-backend-km11.onrender.com/api/booking",
        {
          ...formData,
          date,
          time,
        }
      );

      if (data.success) {
        addBooking(data.booking);
      } else {
        console.error("Failed to add booking:", data.message);
      }
      setFormData({
        name: "",
        contact: "",
        guest: "",
        slot: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    fetchAvailableSlots();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 2 }}>
        <Button variant="contained" color="primary" onClick={openModal}>
          + Add Event
        </Button>
      </Box>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <DialogTitle>Add Reservation</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Contact"
              name="contact"
              variant="outlined"
              fullWidth
              value={formData.contact}
              onChange={handleChange}
            />

            <TextField
              label="Number of Guests"
              name="guest"
              variant="outlined"
              type="number"
              fullWidth
              value={formData.guest}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="slot-label">Available Slot</InputLabel>
              <Select
                labelId="slot-label"
                name="slot"
                value={formData.slot}
                onChange={handleChange}
                variant="outlined"
              >
                {availableSlots.map((slot, index) => (
                  <MenuItem key={index} value={`${slot.date} ${slot.time}`}>
                    {`${slot.date} ${slot.time}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddEvents;

// import logo from "./logo.svg";
import "./App.css";

import { Container, Typography, Box } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import most_logo from "./assets/img/MOSTlogo_white.png";
import earth_image from "./assets/img/temp_earth.png";
import qr_code from "./assets/img/solar_eclipse_QR_code.png";
import eclipse_logo from "./assets/img/eclipse_logo_png.png";

// Constants
const eclipseDate = new Date("April 8, 2024 15:22:00 EDT");
const earthImageSize = "245px";
const qrCodeSize = "200px";

const TimeUnitDisplay = ({ value, unit }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 2
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: { xs: "4rem", sm: "3em" }, fontWeight: "bold" }}
      >
        {value}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.5rem" },
          textTransform: "uppercase"
        }}
      >
        {unit}
      </Typography>
    </Box>
  );
};

export default function App() {
  const calculateTimeToEclipse = useCallback(() => {
    const now = new Date();
    const difference = now - eclipseDate;

    return {
      days: Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.abs(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.abs(Math.floor((difference / 1000 / 60) % 60))
    };
  }, []);

  // State to hold the countdown time
  const [time, setTime] = useState(calculateTimeToEclipse());
  const [eventPassed, setEventPassed] = useState(new Date() > eclipseDate);

  // Update the countdown time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      if (currentTime > eclipseDate) {
        setEventPassed(true);
      }
      setTime(calculateTimeToEclipse());
    }, 60000); // Update every minute

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [calculateTimeToEclipse]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        border: "5px solid red",
        backgroundColor: "black",
        mt: 7,
        height: "calc(100vh - 110px)"
      }}
    >
      <Box
        sx={{
          pt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "FuturaTSNewHeavy",
            fontSize: { xs: "1.5rem", sm: "3.25rem" },
            fontWeight: "bold"
          }}
        >
          {eventPassed
            ? "TIME ELAPSED SINCE THE 2024"
            : "COUNTDOWN TO THE 2024"}
        </Typography>
        <img
          src={eclipse_logo}
          alt="eclipse_logo"
          style={{ maxWidth: "200px", margin: "0 0 20px 0" }}
        ></img>

        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", sm: "3rem" },
            fontWeight: "bold"
          }}
        >
          APRIL 8, 2024
        </Typography>

        {/* Display the countdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {time.days > 0 && <TimeUnitDisplay value={time.days} unit="days" />}
          {time.hours > 0 && (
            <TimeUnitDisplay value={time.hours} unit="hours" />
          )}
          {time.minutes > 0 && (
            <TimeUnitDisplay value={time.minutes} unit="minutes" />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          // alignItems: "center",
          alignItems: "flex-end", // This will handle the vertical alignment of the Earth image
          justifyContent: "space-between" // This will handle the spacing around the Earth image
        }}
      >
        {/* MoST Logo */}
        <Box
          className="most-logo"
          sx={{
            flex: "1", // Allow the box to grow
            display: "flex",
            paddingLeft: "50px",
            marginRight: "-50px"
          }}
        >
          <img
            src={most_logo}
            style={{ width: "100%", maxWidth: "245px" }}
            alt="MoST Logo"
          />
        </Box>

        {/* Earth Image - fixed size */}
        <Box
          sx={{
            flex: "0 0 auto",
            width: earthImageSize,
            mx: 5
          }}
        >
          <img src={earth_image} style={{ width: "100%" }} alt="Earth" />
        </Box>

        {/* QR Code */}
        <Box
          className="qr-code"
          sx={{
            flex: "1", // Allow the box to grow
            display: "flex",
            alignItems: "center", // Center the content within the box
            justifyContent: "center", // Center the content within the box
            flexDirection: "column",
            marginBottom: `calc((${earthImageSize} - ${qrCodeSize}) / 2)` // Center the QR code vertically
          }}
        >
          <Typography
            fontFamily={"FuturaTSNewExtraBold"}
            fontSize={"1.5rem"}
            textAlign="center"
          >
            Scan the QR Code for more about the <br />
            Solar Eclipse Festival at the MOST!
          </Typography>
          <img src={qr_code} style={{ height: qrCodeSize }} alt="QR Code" />
        </Box>
      </Box>
    </Container>
  );
}

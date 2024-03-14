import { Typography, Box } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import "moment-timezone";
import TimeUnitDisplay from "./TimeUnitDisplay";
// import most_logo from "./assets/img/MOSTlogo_white.png";
import brcs_logo from "./assets/img/brcs_logo.png";
import earth_image from "./assets/img/temp_earth.png";
// import black_circle from "./assets/img/black_circle.png";
import qr_code from "./assets/img/brcs_qr_code.png";
import eclipse_logo from "./assets/img/eclipse_logo_png.png";

// Constants
const eclipseDate = moment.tz("2024-04-08 19:09", "America/New_York");

export default function App() {
  const calculateTimeToEclipse = useCallback(() => {
    const now = moment.tz("America/New_York"); // Current time in New York timezone
    const difference = eclipseDate.diff(now); // Difference in milliseconds

    // Convert milliseconds to total days, hours, and minutes
    const duration = moment.duration(difference);
    console.log(duration);
    console.log('days', duration.asDays());
    console.log('hours', duration.hours());
    console.log('minutes', duration.minutes());
    return {
      days: Math.floor(duration.asDays()), // Total full days
      hours: duration.hours(), // Hours remaining after full days
      minutes: duration.minutes() // Minutes remaining after full hours
    };
  }, []);

  // State to hold the countdown time
  const [time, setTime] = useState(calculateTimeToEclipse());
  const [eventPassed, setEventPassed] = useState(moment() > eclipseDate);

  // Update the countdown time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      if (currentTime > eclipseDate) {
        setEventPassed(true);
      }
      setTime(calculateTimeToEclipse());
    }, 60000); // Update every minute

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [calculateTimeToEclipse]);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        padding: 5,
        boxSizing: "border-box",
        alignItems: "center"
      }}
    >
      {/* Header */}
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
            fontSize: { xs: "1.5rem", sm: "4.5rem" },
            fontWeight: "bold",
            lineHeight: 0.6
          }}
        >
          {eventPassed ? "TIME ELAPSED SINCE " : "COUNTDOWN TO "}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "FuturaTSNewHeavy",
            fontSize: { xs: "1.5rem", sm: "4.5rem" },
            fontWeight: "bold",
            mb: 3
          }}
        >
          APRIL 8, 2024
        </Typography>
        <img
          src={eclipse_logo}
          alt="eclipse_logo"
          style={{ maxWidth: "400px", margin: "0 0 25px 0" }}
        ></img>

        {/* Display the countdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {time.days > 0 && (
            <TimeUnitDisplay
              value={time.days}
              unit={time?.days > 1 ? "days" : "day"}
              showColon
            />
          )}
          {(time.days > 0 || time.hours > 0) && (
            <TimeUnitDisplay
              value={time.hours}
              unit={time?.hours > 1 ? "hours" : "hour"}
              showColon
            />
          )}
          <TimeUnitDisplay
            value={time.minutes}
            unit={time?.minutes > 1 ? "minutes" : "minute"}
          />
        </Box>
      </Box>

      {/* Bottom section with MoST Logo, Earth sticker placement, and QR code */}
      <Box
        sx={{
          height: "30%",
          maxHeight: "30%",
          width: "90%",
          display: "flex",
          flexDirection: "row",
          boxSizing: "border-box",
          overflow: "hidden",
          gap: "10px"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%", // Enforces Box height
            maxHeight: "100%",
            display: "flex", // Use flex to control content alignment
            justifyContent: "flex-start", // Align content to the left
            alignItems: "flex-end", // Center content vertically and horizontally
            boxSizing: "border-box"
          }}
        >
          <img
            src={brcs_logo}
            style={{
              height: "100%",
              objectFit: "contain"
            }}
            alt="BRCS Logo"
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%", // Enforces Box height
            maxHeight: "100%",
            display: "flex", // Use flex to control content alignment
            boxSizing: "border-box",
            justifyContent: "center", // Align content to the center
            alignItems: "center" // Center content vertically and horizontally
          }}
        >
          <img
            src={earth_image}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              display: "block"
            }}
            alt="Earth"
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              borderRadius: "10px"
            }}
          >
            <img
              src={qr_code}
              style={{
                height: "80%",
                objectFit: "contain",
                display: "block"
              }}
              alt="Earth"
            />
            <Typography variant="body1" mt={1}>
              https://tinyurl.com/as9wejz5
            </Typography>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

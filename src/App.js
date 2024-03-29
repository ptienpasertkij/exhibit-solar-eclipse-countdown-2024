import { Typography, Box } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import TimeUnitDisplay from "./TimeUnitDisplay";
import most_logo from "./assets/img/MOSTlogo_white.png";
// import earth_image from "./assets/img/temp_earth.png";
import black_circle from "./assets/img/black_circle.png";
import qr_code from "./assets/img/solar_eclipse_QR_code.png";
import eclipse_logo from "./assets/img/eclipse_logo_png.png";
import moment from "moment";
import "moment-timezone";

// Constants
const earthImageSize = "348px";
const earthImageHeight_temp = "350px";
const qrCodeSize = "300px";
const eclipseDate = moment.tz("2024-04-08 14:09", "America/New_York");

export default function App() {
  const calculateTimeToEclipse = useCallback(() => {
    const now = moment.tz("America/New_York"); // Current time in New York timezone
    const difference = eclipseDate.diff(now); // Difference in milliseconds

    // Convert milliseconds to total days, hours, and minutes
    const duration = moment.duration(difference);
    console.log(duration);
    console.log("days", duration.asDays());
    console.log("hours", duration.hours());
    console.log("minutes", duration.minutes());
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
        // backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box"
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
          width: "100%",
          display: "flex",
          // alignItems: "center",
          alignItems: "flex-end", // This will handle the vertical alignment of the Earth image
          justifyContent: "space-between", // This will handle the spacing around the Earth image
          // paddingX: 0,
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {/* MoST Logo */}
        <Box
          className="most-logo"
          sx={{
            flex: "1", // Allow the box to grow
            display: "flex"
            // paddingLeft: "50px",
            // marginRight: "-50px",
          }}
        >
          <img
            src={most_logo}
            style={{
              width: "100%",
              maxWidth: "400px",
              position: "relative",
              left: "50px",
              bottom: "50px"
            }}
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
          <img
            src={black_circle}
            style={{ width: "100%", height: earthImageHeight_temp }}
            alt="Earth"
          />
        </Box>

        {/* QR Code */}
        <Box
          className="qr-code"
          sx={{
            flex: "1", // Allow the box to grow
            display: "flex",
            alignItems: "center", // Center the content within the box
            justifyContent: "center", // Center the content within the box
            paddingBottom: 10,
            flexDirection: "column",
            position: "relative",
            right: "-30px"
          }}
        >
          <Box
            sx={{
              padding: 3,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, .9)",
              boxSizing: "border-box"
            }}
          >
            <Typography
              fontFamily={"FuturaTSNewMedium"}
              fontSize={"1.5rem"}
              textAlign="center"
            >
              Scan the QR Code for more <br />
              about the Solar Eclipse Festival <br />
              at the MOST!
            </Typography>
            <img src={qr_code} style={{ height: qrCodeSize }} alt="QR Code" />
            <Typography
              fontFamily={"Arial"}
              fontSize={"1.5rem"}
              letterSpacing={2}
              mt={1}
            >
              most.org/solareclipse2024
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

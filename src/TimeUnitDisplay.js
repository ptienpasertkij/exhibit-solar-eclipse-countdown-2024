import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TimeUnitDisplay = ({ value, unit, showColon }) => {
  const formattedValue = String(value).padStart(2, "0");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography
          component="span"
          fontFamily="FuturaTSNewMedium"
          fontWeight="bold"
          lineHeight={1}
          fontSize={{ xs: "4rem", sm: "12em" }}
          letterSpacing={5}
        >
          {formattedValue}
        </Typography>
        <Typography
          component="span"
          fontFamily="FuturaTSNew"
          fontSize={{ xs: "1.5rem", sm: "2.5rem" }}
          textTransform="uppercase"
          letterSpacing={2}
        >
          {unit}
        </Typography>
      </Box>
      {showColon && (
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "4rem", sm: "12em" },
            fontWeight: "bold",
            lineHeight: 1,
            mx: 3,
            position: "relative",
            bottom: "45px"
          }}
        >
          :
        </Typography>
      )}
    </>
  );
};

TimeUnitDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  showColon: PropTypes.bool
};

export default TimeUnitDisplay;

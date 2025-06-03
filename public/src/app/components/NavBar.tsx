import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

// Reusable style for NavBar buttons
const ButtonHover = {
  "&:hover": {
    backgroundColor: "#66bb6a",
    color: "#fff",
  },
};

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={1}
      className="!sticky !top-0 !z-10"
      sx={{ bgcolor: "#26A82C" }} // Custom green
    >
      <Toolbar className="flex justify-center space-x-4">
        <Box>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={ButtonHover}
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={ButtonHover}
          >
            About
          </Button>
        </Box>
        <Box>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={ButtonHover}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
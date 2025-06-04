"use client";
import React, { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      className="!top-0 !z-10"
      sx={{
        bgcolor: scrolled
          ? "rgba(38, 168, 44, 0.6)" // Less transparent when scrolled
          : "rgba(38, 168, 44, 1.00)", // More transparent at top
        transition: "background-color 0.3s",
      }}
    >
      <Toolbar className="flex justify-center space-x-4">
        <Box>
          <Button component={Link} href="/" color="inherit" sx={ButtonHover}>
            Home
          </Button>
        </Box>
        <Box>
          <Button component={Link} href="/" color="inherit" sx={ButtonHover}>
            About
          </Button>
        </Box>
        <Box>
          <Button component={Link} href="/" color="inherit" sx={ButtonHover}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
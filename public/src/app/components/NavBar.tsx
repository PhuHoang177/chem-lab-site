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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always render the same color on server and first client render
  const bgColor = !mounted
    ? "rgba(38, 168, 44, 1.00)" // Opaque on SSR and before hydration
    : scrolled
      ? "rgba(38, 168, 44, 0.6)" // Less transparent when scrolled
      : "rgba(38, 168, 44, 1.00)"; // More transparent at top

  return (
    <AppBar
      position="fixed"
      elevation={1}
      className="!top-0 !z-10"
      sx={{
        bgcolor: bgColor,
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
            Research
          </Button>
        </Box>
        <Box>
          <Button
            component={Link}
            href="/members"
            color="inherit"
            sx={ButtonHover}
          >
            Members
          </Button>
        </Box>
        <Box>
          <Button component={Link} href="/" color="inherit" sx={ButtonHover}>
            Publications
          </Button>
        </Box>
        <Box>
          <Button component={Link} href="/" color="inherit" sx={ButtonHover}>
            News
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

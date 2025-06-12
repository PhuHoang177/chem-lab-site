"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/" },
    { label: "Members", href: "/members" },
    { label: "Publications", href: "/" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/" },
  ];

  return (
    <AppBar
      suppressHydrationWarning
      position="fixed"
      elevation={1}
      className="!top-0 !z-50"
      sx={{
        bgcolor: bgColor,
        transition: "background-color 0.3s",
        zIndex: 1300,
      }}
    >
      <Toolbar className="flex justify-center space-x-4">
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {navLinks.map((link) => (
                  <ListItem key={link.label} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          navLinks.map((link) => (
            <Box key={link.label}>
              <Button
                component={Link}
                href={link.href}
                color="inherit"
                sx={ButtonHover}
              >
                {link.label}
              </Button>
            </Box>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
}

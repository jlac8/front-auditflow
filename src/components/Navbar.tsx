import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const settings = ["Profile", "Logout"];

function NavBar() {
  const { user, removeUser } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (option: string) => {
    if (option === "Profile") {
      navigate("/profile");
    } else if (option === "Logout") {
      removeUser();
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={user ? "/dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AUDITFLOW
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to={user ? "/dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AUDITFLOW
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {!user ? (
            <>
              <Button component={RouterLink} to="/sign-up" color="inherit">
                Sign Up
              </Button>
              <Button component={RouterLink} to="/sign-in" color="inherit">
                Sign In
              </Button>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${user.name}`}
                    src={user.profilePicture || "/static/images/avatar/2.jpg"}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleMenuClick(option)}
                  >
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                <Typography sx={{ color: "white", fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography sx={{ color: "white", fontSize: "0.75rem" }}>
                  {user.role || "Auditor"}
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

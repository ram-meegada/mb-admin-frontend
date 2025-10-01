import * as React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  Collapse,
} from "@mui/material";

import { ExpandLess } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { GiCow } from "react-icons/gi";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PaymentsIcon from "@mui/icons-material/Payments";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AndroidIcon from '@mui/icons-material/Android';
import { Link, useLocation } from "react-router-dom";
import {
  ADD_CUSTOMER_ENDPOINT_FE,
  ALL_CUSTOMERS_ENDPOINT_FE,
  CHAT_WITH_BUJJI_ENDPOINT_FE,
  EXPENDITURE_ADD_ENDPOINT_FE,
  EXPENDITURE_ANALYTICS_ENDPOINT_FE,
  EXPENDITURE_LIST_ENDPOINT_FE,
  HOME_ENDPOINT_FE,
  MARGIN_ANALYTICS_ENDPOINT_FE,
  MONTH_PAYMENTS_ENDPOINT_FE,
  ORDERS_LISTING_ENDPOINT_FE,
  PAYMENTS_ANALYTICS_ENDPOINT_FE,
  STOCK_ADD_ENDPOINT_FE,
  STOCKS_LIST_ENDPOINT_FE,
} from "../../utils/endpoints";

const drawerWidth = 250;

export default function SidebarMuiComp() {
  const [openSub, setOpenSub] = React.useState(0);
  const location = useLocation()

  const handleClick = (ind: number) => {
    if (openSub === ind) {
      setOpenSub(0);
      return;
    }
    setOpenSub(ind);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          "--AppBar-background": "var(--primary-background-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid var(--dark-grey-border)",
        }}
      >
        <Toolbar />
      </AppBar>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "var(--dark-grey)",
            color: "white",
            borderRight: "1px solid var(--dark-grey-border)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={HOME_ENDPOINT_FE}
              selected={location.pathname === HOME_ENDPOINT_FE}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Stock */}
          <ListItemButton onClick={() => handleClick(2)}>
            <ListItemIcon>
              <GiCow size={25} />
            </ListItemIcon>
            <ListItemText primary="Live Stock" />
            {openSub == 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSub == 2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={STOCK_ADD_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === STOCK_ADD_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add stock" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={STOCKS_LIST_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === STOCKS_LIST_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Stocks list" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Customers */}
          <ListItemButton onClick={() => handleClick(3)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
            {openSub == 3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSub == 3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={ADD_CUSTOMER_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === ADD_CUSTOMER_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add customer" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={ALL_CUSTOMERS_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === ALL_CUSTOMERS_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="All customers" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Expenditure */}
          <ListItemButton onClick={() => handleClick(4)}>
            <ListItemIcon>
              <CurrencyRupeeIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
            {openSub == 4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSub == 4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={EXPENDITURE_ADD_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === EXPENDITURE_ADD_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Expenditure" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={EXPENDITURE_LIST_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === EXPENDITURE_LIST_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="All Expenses" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Analytics */}
          <ListItemButton onClick={() => handleClick(5)}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
            {openSub == 5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSub == 5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={EXPENDITURE_ANALYTICS_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === EXPENDITURE_ANALYTICS_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <CurrencyRupeeIcon />
                </ListItemIcon>
                <ListItemText primary="Expenses Analytics" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={PAYMENTS_ANALYTICS_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === PAYMENTS_ANALYTICS_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Payment Analytics" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={MARGIN_ANALYTICS_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === MARGIN_ANALYTICS_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Margin Analytics" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Payments */}
          <ListItemButton onClick={() => handleClick(6)}>
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
            {openSub == 6 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSub == 6} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={MONTH_PAYMENTS_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === MONTH_PAYMENTS_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Monthly Payments" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Orders */}
          <ListItemButton onClick={() => handleClick(7)}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {openSub == 7 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSub == 7} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={ORDERS_LISTING_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === ORDERS_LISTING_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="All Orders" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Orders */}
          <ListItemButton onClick={() => handleClick(8)}>
            <ListItemIcon>
              <AndroidIcon />
            </ListItemIcon>
            <ListItemText primary="BujjiAI" />
            {openSub == 8 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSub == 8} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={CHAT_WITH_BUJJI_ENDPOINT_FE}
                sx={{ pl: 4 }}
                selected={location.pathname === CHAT_WITH_BUJJI_ENDPOINT_FE}
              >
                <ListItemIcon>
                  <ChatBubbleIcon />
                </ListItemIcon>
                <ListItemText primary="Ask Bujji" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
}

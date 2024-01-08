// import re
import PublicIcon from "@mui/icons-material/Public";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddTaskIcon from "@mui/icons-material/AddTask";
export const listMenu = [
  {
    id: 0,
    link: "/",
    icon: <PublicIcon />,
    text: "sidebar.app_name",
  },
  {
    id: 1,
    link: "/dashboard",
    icon: <DashboardIcon />,
    text: "sidebar.dashboard",
  },
  {
    id: 2,
    link: "/vehicles",
    icon: <LocalShippingIcon />,
    text: "sidebar.vehicle",
  },
  {
    id: 3,
    link: "/drivers",
    icon: <AccountCircleIcon />,
    text: "sidebar.driver",
  },
  {
    id: 4,
    link: "/bins",
    icon: <DeleteIcon />,
    text: "sidebar.bin",
  },
  {
    id: 5,
    link: "/companies",
    icon: <SupervisorAccountIcon />,
    text: "sidebar.company",
  },
  {
    id: 6,
    link: "/alerts",
    icon: <ReportGmailerrorredIcon />,
    text: "sidebar.alerts",
  },
  {
    id: 7,
    link: "/tasks",
    icon: <AddTaskIcon />,
    text: "sidebar.task",
  },
];

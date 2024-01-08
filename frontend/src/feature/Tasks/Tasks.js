// @mui
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography, Button, Breadcrumbs, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  BoxContainer,
  BoxTitle,
  BoxStack,
} from "../../components/Box/BoxContainer";
import { DataTable } from "../../components/DataTable";
import TaskAction from "./TaskAction";
import { isAdmin, isStaff } from "../Auth/Role";
import {
  getListTaskDataAsync,
  tasksSelector,
} from "../../store/reducers/taskSlice";

const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tasks = useSelector(tasksSelector);

  useEffect(() => {
    dispatch(getListTaskDataAsync());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(tasks);

  const columns = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.id")}`,
      minWidth: 70,
      sortable: false,
    },
    {
      field: "driverName",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.driver")}`,
      flex: 1,
      minWidth: 200,
      sortable: false,
    },
    {
      field: "vehiclePlate",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.vehicle")}`,
      minWidth: 100,
      flex: 1,
      sortable: true,
    },
    {
      field: "binIds",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.bins")}`,
      minWidth: 100,
      flex: 1,
      sortable: false,
    },
    {
      field: "description",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.description")}`,
      minWidth: 100,
      sortable: true,
    },
    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("tasks.table.action")}`,
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => <TaskAction params={params} />,
    },
  ];

  return (
    <Fragment>
      <BoxContainer>
        <BoxTitle>
          <BoxStack>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {t("tasks.pageName")}
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("tasks.home")}
                </Link>
                <Typography color="text.primary">
                  {t("tasks.pageName")}
                </Typography>
              </Breadcrumbs>
            </Typography>

            {isAdmin(user) && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/tasks/add")}
              >
                {t("tasks.add")}
              </Button>
            )}
          </BoxStack>
          <DataTable rows={tasks} columns={columns} />
        </BoxTitle>
      </BoxContainer>
    </Fragment>
  );
};

export default Tasks;

import React, { useEffect, Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { postTaskDataAsync } from "../../store/reducers/taskSlice";
import {
  binsSelector,
  getBinsAvailableDataAsync,
} from "../../store/reducers/binSlice";
import {
  driversSelector,
  getDriversAvailableDataAsync,
} from "../../store/reducers/driverSlice";
import {
  getVehiclesAvailableDataAsync,
  vehiclesSelector,
} from "../../store/reducers/vehicleSlice";

const TaskForm = ({ state }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const drivers = useSelector(driversSelector);
  const vehicles = useSelector(vehiclesSelector);
  const bins = useSelector(binsSelector);

  let [click, setClick] = useState(false);

  const handleClick = (e) => {
    setClick(true);
  };

  const [taskItem, setTaskItem] = useState({
    id: 0,
    driverId: "",
    vehicleId: "",
    listBinId: [],
    description: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "listBinId ") {
      setTaskItem({ ...taskItem, listBinId: value.split(",") });
      return;
    }
    setTaskItem({ ...taskItem, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formTask = document.getElementById("formTask");
    const formData = new FormData(formTask);
    dispatch(postTaskDataAsync(formData));
    navigate("/tasks");
  };

  const getListData = async () => {
    const dispatchPromises = [
      dispatch(getVehiclesAvailableDataAsync()),
      dispatch(getDriversAvailableDataAsync()),
      dispatch(getBinsAvailableDataAsync()),
    ];

    return Promise.all(dispatchPromises)
      .then(() => {
        console.log("Tất cả các actions đã được dispatch.");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi dispatch actions:", error);
      });
  };

  useEffect(() => {
    // getListData();
    dispatch(getVehiclesAvailableDataAsync());
    dispatch(getDriversAvailableDataAsync());
    dispatch(getBinsAvailableDataAsync());
  }, [dispatch]);

  return (
    <Box>
      <Fragment>
        <Box
          sx={{
            height: "auto",
            py: 4,
            pt: 6,
            px: 2,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {t("tasks.create")}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("tasks.home")}
                </Link>
                <Link underline="hover" color="inherit" href="/tasks">
                  {t("tasks.pageName")}
                </Link>
                <Typography color="text.primary">
                  {state === "new" ? `${t("tasks.add")}` : `ID: ${taskItem.id}`}
                </Typography>
              </Breadcrumbs>
            </Typography>
          </Stack>

          <Stack
            id="formTask"
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            component="form"
            noValidate
            autoComplete="off"
            encType="multipart/form-data"
            sx={{
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
            onSubmit={handleSave}
          >
            <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight="bold"
                  gutterBottom
                >
                  {t("bins.form.infomation")}
                </Typography>

                {drivers && (
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                      mt: 1,
                      width: "100%",
                    }}
                  >
                    <InputLabel id="outlined-basic">
                      {t("tasks.table.driver")}
                    </InputLabel>
                    <Select
                      labelId="outlined-basic"
                      id="outlined-basic"
                      onChange={handleInputChange}
                      name="driverId"
                      label={t("tasks.table.driver")}
                    >
                      {drivers.map((item) => {
                        return (
                          <MenuItem value={item?.id}>{item?.fullName}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {vehicles && (
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                      mt: 1,
                      width: "100%",
                    }}
                  >
                    <InputLabel id="outlined-basic">
                      {t("tasks.table.vehicle")}
                    </InputLabel>
                    <Select
                      labelId="outlined-basic"
                      id="outlined-basic"
                      onChange={handleInputChange}
                      name="vehicleId"
                      label={t("tasks.table.vehicle")}
                    >
                      {vehicles.map((item) => {
                        return (
                          <MenuItem value={item?.id}>{item?.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {bins && (
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                      mt: 1,
                      width: "100%",
                    }}
                  >
                    <InputLabel id="outlined-basic">
                      {t("tasks.table.bins")}
                    </InputLabel>
                    <Select
                      labelId="outlined-basic"
                      id="outlined-basic"
                      onChange={handleInputChange}
                      name="listBinId"
                      label={t("tasks.table.bins")}
                      multiple
                    >
                      {bins.map((item) => {
                        return (
                          <MenuItem value={item?.id}>{item?.address}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  id="outlined-basic"
                  label={t("tasks.table.description")}
                  variant="outlined"
                  sx={{ width: "100%", mb: 2, mt: 1 }}
                  onChange={handleInputChange}
                  name="description"
                />
              </Box>
            </Paper>
            <Box sx={{ width: "100%", my: 1 }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SaveIcon />}
                sx={{ width: "100%", mb: 2, mt: 1, py: 1.5 }}
                type="submit"
              >
                {t("vehicles.form.save")}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Fragment>
    </Box>
  );
};

export default TaskForm;

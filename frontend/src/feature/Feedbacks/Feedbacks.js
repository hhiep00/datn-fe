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
import { isAdmin } from "../Auth/Role";
import {
  feedBacksSelector,
  getListFeedBackDataAsync,
} from "../../store/reducers/feedBackSlice";

const Feedbacks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const feedBacks = useSelector(feedBacksSelector);

  useEffect(() => {
    dispatch(getListFeedBackDataAsync());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  const columns = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("feedbacks.table.id")}`,
      minWidth: 70,
      sortable: false,
    },
    {
      field: "creatorName",
      headerClassName: "super-app-theme--header",
      headerName: `${t("feedbacks.table.creator")}`,
      flex: 1,
      minWidth: 200,
      sortable: false,
    },
    {
      field: "rating",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("feedbacks.table.rating")}`,
      minWidth: 100,
      flex: 1,
      sortable: true,
    },
    {
      field: "content",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("feedbacks.table.content")}`,
      minWidth: 100,
      flex: 1,
      sortable: false,
    },
    {
      field: "createdAt",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: `${t("feedbacks.table.createdAt")}`,
      minWidth: 100,
      sortable: true,
      renderCell: (props) =>
        new Date(props.row?.createdAt).toUTCString()?.slice(0, 12),
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
              {t("feedbacks.pageName")}
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("feedbacks.home")}
                </Link>
                <Typography color="text.primary">
                  {t("feedbacks.pageName")}
                </Typography>
              </Breadcrumbs>
            </Typography>

            {isAdmin(user) && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/feedbacks/add")}
              >
                {t("feedbacks.add")}
              </Button>
            )}
          </BoxStack>
          <DataTable rows={feedBacks} columns={columns} />
        </BoxTitle>
      </BoxContainer>
    </Fragment>
  );
};

export default Feedbacks;

import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import StarIcon from "@mui/icons-material/Star";
import { postFeedBackDataAsync } from "../../store/reducers/feedBackSlice";

const FeedbackForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [item, setItem] = useState({
    creatorId: user?.id,
    rating: "",
    content: "",
  });

  const arrStar = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(postFeedBackDataAsync(item));
    navigate("/feedbacks");
  };

  console.log(item);

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
              {t("feedbacks.create")}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("feedbacks.home")}
                </Link>
                <Link underline="hover" color="inherit" href="/feedbacks">
                  {t("feedbacks.pageName")}
                </Link>
                <Typography color="text.primary">
                  {t("feedbacks.add")}
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
                  {t("feedbacks.form.infomation")}
                </Typography>

                <TextField
                  id="outlined-basic"
                  label={t("feedbacks.table.content")}
                  variant="outlined"
                  sx={{ width: "100%", mb: 2, mt: 1 }}
                  onChange={handleInputChange}
                  name="content"
                />
                <div className="d-flex">
                  {arrStar.map((star) => {
                    return (
                      <div
                        key={star}
                        onMouseEnter={() => setItem({ ...item, rating: star })}
                      >
                        <IconButton
                          className={item.rating >= star ? "star-active" : ""}
                        >
                          <StarIcon />
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              </Box>
              <Box sx={{ width: "20%", my: 1 }}>
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
            </Paper>
          </Stack>
        </Box>
      </Fragment>
    </Box>
  );
};

export default FeedbackForm;

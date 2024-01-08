import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { isAdmin } from "../Auth/Role";
import { deleteTaskDataAsync } from "../../store/reducers/taskSlice";

const TaskIcon = ({ params }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onDelete = (e) => {
    const taskId = params.row.id;
    dispatch(deleteTaskDataAsync(taskId));
    window.location.reload();
  };

  return (
    <Box>
      {isAdmin() && (
        <Box>
          <Tooltip title={t("bins.delete")}>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default TaskIcon;

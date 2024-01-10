import { Box, Typography } from '@mui/material'
import { React, useState, useEffect } from 'react';
// import { getBinStateLog } from '../../store/reducers/binSlice';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

const BinStateLog = ({ binId }) => {
    const {t} = useTranslation();
    // const [binStateLog, setBinStateLog] = useState([]);

    // useEffect(() => {
    //     getBinStateLog(binId).then((data) => {
    //         setBinStateLog(data);
    //         console.log(data);
    //     });
    // }, []);

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
        { field: 'description', headerClassName: 'super-app-theme--header', headerName: `${t("tableLog.description")}`, minWidth: 200, },
        {
            field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: `${t("tableLog.time")}`, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const date = params.value.slice(0, 19).replace('T', ' ').toString();
                return (
                    <Typography sx={{ fontSize: "0.875rem" }}>
                        {date}
                    </Typography>
                ); 
            }
        },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("tableLog.latitude")}`, minWidth: 150, flex: 1, sortable: false },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("tableLog.longitude")}`, minWidth: 150, flex: 1, sortable: false },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("tableLog.status")}`, minWidth: 100, sortable: true },
    ];

    return (
        <Box sx={{ width: '100%', height: 400, mt: 4 }}>
            <Box sx={{ textAlign: 'start', mb: 1, mt: 4 }}>
                <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000', }}>
                 
                </Typography>

            </Box>
            <Box sx={{ width: '100%', height: 400, mb: 2 }}>
               
            </Box>
        </Box>
    )
}

export default BinStateLog
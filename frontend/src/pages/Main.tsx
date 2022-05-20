import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination} from '@mui/material';
import {ChangeEvent, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routerPaths, ROUTES_DATA_MAP, ROUTES_NESTED_RENDER_PATH_MAP} from "../const";

export const Main = () => {
        let navigate = useNavigate();
        let location = useLocation();
        let path = location.pathname;

        const [page, setPage] = useState(1);
        const [data, setData] = useState<any>([]);
        const dataPerPage = useState(5)[0];

        useEffect(() => {
            setData(ROUTES_DATA_MAP[path])
        }, [location]);

        const handleChange = (event: ChangeEvent<unknown>, value: number) => {
            setPage(value);
        };

        const renderDeleteIcon = [routerPaths.root, routerPaths.teachers].includes(path) ? null : (<IconButton edge="end">
            <DeleteIcon/>
        </IconButton>);

        const renderDownloadIcon = [routerPaths.root, routerPaths.teachers].includes(path) ? null : (<ListItemIcon>
            <Link to="/tutors.csv" target="_blank" download>
                <IconButton edge="end" onClick={e => e.stopPropagation()}>
                    <FileDownloadIcon/>
                </IconButton>
            </Link>
        </ListItemIcon>);

        return (
            <Grid container flexDirection="column" alignItems='center'>
                <Grid item flexDirection="column" width={'100%'} textAlign={'center'} gap={1}>
                    <List>
                        {data.slice((page - 1) * dataPerPage, page * dataPerPage).map((item: any) => (
                            <ListItem secondaryAction={renderDeleteIcon}>
                                <ListItemButton onClick={() => {
                                    if (ROUTES_NESTED_RENDER_PATH_MAP[path] === undefined) return;
                                    navigate(ROUTES_NESTED_RENDER_PATH_MAP[path]!);
                                }}>
                                    {renderDownloadIcon}
                                    <ListItemText primary={item}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item>
                    <Pagination
                        count={Math.ceil(data.length / dataPerPage)}
                        page={page}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        );
    }
;

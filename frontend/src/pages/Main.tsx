import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Pagination,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api, transformUrl } from '../api/client';
import { routerPaths, ROUTES_DATA_MAP, ROUTES_NESTED_RENDER_PATH_MAP } from '../const';
import { CrudManager, FetchUriManager } from '../helpers';
import { PAGE_PARAM, SIZE_PARAM } from '../urls';

const renderDeleteIcon = (path: string, item: any) =>
    [routerPaths.root, routerPaths.teachers].includes(path) ? null : (
        <IconButton
            edge="end"
            onClick={(e) => {
                e.stopPropagation();
                // api.delete('');
            }}
        >
            <DeleteIcon />
        </IconButton>
    );

const renderDownloadIcon = (path: string) =>
    [routerPaths.disciplines, routerPaths.teachers].includes(path) ? null : (
        <ListItemIcon>
            <IconButton edge="end" onClick={(e) => e.stopPropagation()}>
                <FileDownloadIcon />
            </IconButton>
        </ListItemIcon>
    );

export const Main = () => {
    let initPage = 1;
    let initOpenId = '';
    let initPageCount = 0;

    let navigate = useNavigate();
    let location = useLocation();
    let path = location.pathname;

    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState(initPage);
    const [pageCount, setPageCount] = useState(initPageCount);
    const [openId, setOpenId] = useState(initOpenId);

    const dataPerPage = useState(5)[0];

    useEffect(() => {
        setPage(initPage);

        if (path === routerPaths.disciplines) {
            setOpenId(initOpenId);
        }

        const url =
            transformUrl(FetchUriManager[path], openId) +
            transformUrl(PAGE_PARAM, String(page - 1)) +
            transformUrl(SIZE_PARAM, String(dataPerPage));

        api.get(url).then((data: any) => {
            setData(CrudManager.read(data.content));
            setPageCount(data.totalPages);
        });
    }, [location]);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        const url =
            transformUrl(FetchUriManager[path], openId) +
            transformUrl(PAGE_PARAM, String(page - 1)) +
            transformUrl(SIZE_PARAM, String(dataPerPage));

        api.get(url).then((data: any) => {
            setPage(value);
            setData(CrudManager.read(data.content));
        });
    };

    return (
        <Grid container flexDirection="column" alignItems="center">
            <Grid item flexDirection="column" width={'100%'} textAlign={'center'} gap={1}>
                <List>
                    {data.map((item: any) => (
                        <ListItem secondaryAction={renderDeleteIcon(path, item)}>
                            <ListItemButton
                                onClick={() => {
                                    if (ROUTES_NESTED_RENDER_PATH_MAP[path] === undefined) return;
                                    navigate(ROUTES_NESTED_RENDER_PATH_MAP[path]!);
                                    setOpenId(item.id);
                                }}
                            >
                                {renderDownloadIcon(path)}
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Grid>
        </Grid>
    );
};

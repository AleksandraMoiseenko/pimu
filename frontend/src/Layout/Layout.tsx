import React from 'react';
import { Box, Fab } from '@mui/material';
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routerPaths, TAB_LABEL_PATH_MAP } from '../const';
import { Header } from './Header';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const fabStyleAddCourse = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fabStyleAddTeacher = {
    position: 'absolute',
    bottom: 16,
    right: 82,
};

function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export function Layout() {
    let location = useLocation();
    let path = location.pathname;
    let navigate = useNavigate();

    const routeMatch = useRouteMatch([
        routerPaths.root,
        routerPaths.courses,
        routerPaths.disciplines,
        routerPaths.modules,
        routerPaths.teachers,
        routerPaths.topics,
    ]);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <>
            <Box>
                <Header />
                <Box width={'100%'}>
                    <Box>
                        {path !== routerPaths.new && (
                            <Tabs
                                value={currentTab}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                            >
                                <Tab
                                    label={TAB_LABEL_PATH_MAP[path]?.label || 'Дисциплины'}
                                    value={
                                        TAB_LABEL_PATH_MAP[path]?.value || routerPaths.disciplines
                                    }
                                    to={TAB_LABEL_PATH_MAP[path]?.to || routerPaths.disciplines}
                                    component={Link}
                                />
                                <Tab
                                    label="Преподователи"
                                    value="/teachers"
                                    to="teachers"
                                    component={Link}
                                />
                            </Tabs>
                        )}
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            <Fab
                disabled={[routerPaths.root, routerPaths.new].includes(path)}
                onClick={() => {
                    navigate(routerPaths.new, {
                        state: {
                            from: path,
                            isEditing: true,
                        },
                    });
                }}
                color="primary"
                aria-label="add"
                sx={fabStyleAddCourse}
            >
                <AddIcon />
            </Fab>
            {path === routerPaths.teachers && (
                <Fab color="primary" aria-label="add" sx={fabStyleAddTeacher}>
                    <FileDownloadIcon />
                </Fab>
            )}
        </>
    );
}

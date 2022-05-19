import React from "react";
import {Box, Fab} from '@mui/material';
import {Link, matchPath, Outlet, useLocation} from "react-router-dom";
import {Header} from "./Header";
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
    const {pathname} = useLocation();

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
    const routeMatch = useRouteMatch(['/', '/disciplines', '/teachers']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Box>
            <Header/>
            <Box width={'100%'}>
                <Box>
                    <Tabs
                        value={currentTab}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                    >
                        <Tab label="Дисциплины" value="/disciplines" to="disciplines" component={Link}/>
                        <Tab label="Преподователи" value="/teachers" to="teachers" component={Link}/>
                    </Tabs>
                    <Outlet/>
                </Box>
            </Box>
            <Fab onClick={() => console.log('add courses')} color="primary" aria-label="add" sx={fabStyleAddCourse}>
                <AddIcon/>
            </Fab>

            <Fab onClick={() => console.log('add teacher')} color="primary" aria-label="add" sx={fabStyleAddTeacher}>
                <FileDownloadIcon/>
            </Fab>
        </Box>
    );
}

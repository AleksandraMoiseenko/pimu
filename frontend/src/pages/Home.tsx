import { Box, Grid, Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const courseList = [
    'Course #1',
    'Course #2',
    'Course #3',
    'Course #4',
    'Course #5',
    'Course #6',
    'Course #7',
    'Course #8',
    'Course #9',
    'Course #10',
];

export const Home = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(courseList);
    const dataPerPage = useState(5)[0];

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Grid container flexDirection="column">
            <Grid item>
                {data.slice((page - 1) * dataPerPage, page * dataPerPage).map((item) => (
                    <p>{item}</p>
                ))}
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
};

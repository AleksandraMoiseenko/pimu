import {Grid, List, ListItem, ListItemButton, ListItemText, Pagination} from '@mui/material';
import {ChangeEvent, useState} from 'react';

const courseList = [
    'Нидерландский курс глобального здравоохранения и тропической медицины',
    'Королевская диабетическая стопа: принципы и практика',
    'Влияние аллергии на пенициллин',
    'Иммунология',
    'Терминология восточной медицины',
    'Анатомическая лаборатория',
    'COVID-19: курс диагностики и тестирования',
    'Курс по вопросам дыхательных путей',
];

export const Main = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(courseList);
    const dataPerPage = useState(5)[0];

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Grid container flexDirection="column" alignItems='center'>
            <Grid item flexDirection="column" width={'100%'} textAlign={'center'} gap={1}>
                <List>
                    {data.slice((page - 1) * dataPerPage, page * dataPerPage).map((item) => (
                        <ListItem>
                            <ListItemButton>
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
};

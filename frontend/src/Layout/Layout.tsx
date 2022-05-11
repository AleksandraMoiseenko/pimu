import { Box, Grid } from '@mui/material';
import logo from '../assets/logo.svg';
import { Home } from '../pages/Home';

export function Layout() {
    return (
        <Grid>
            <header>
                <Box>
                    <img src={logo} alt="logo" width={380} height={100} />
                </Box>
            </header>
            <main>
                <Home />
            </main>
        </Grid>
    );
}

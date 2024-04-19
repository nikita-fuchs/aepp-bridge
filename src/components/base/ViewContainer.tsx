import React from 'react';
import { makeStyles } from '@mui/styles';

import NavigationBar from '../navigation';
import Typography from '@mui/material/Typography';
import { Link, Box, Container } from '@mui/material';

import AeternityLogo from '../base/icons/logo';

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        flex: 1,
    },
    footer: {
        width: '100%',
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
});
const linkStyles = { marginLeft: 2, textDecoration: 'none', ':hover': { textDecoration: 'underline' }, color: 'black' };

const ViewContainer: React.FC<{ children: React.ReactNode }> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NavigationBar />
            <div className={classes.container}>{props.children}</div>
            <footer className={classes.footer}>
                <Container sx={{ flexDirection: 'row', display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 12 }}>Powered by</Typography>
                        <AeternityLogo width={100} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                        <Link sx={linkStyles} href="https://aescan.io" target="_blank">
                            Blockchain Explorer
                        </Link>
                        <Link sx={linkStyles} href="https://forum.aeternity.com" target="_blank">
                            Community Support
                        </Link>
                    </Box>
                </Container>
            </footer>
        </div>
    );
};

export default ViewContainer;

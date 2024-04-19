import { Box, Toolbar, AppBar, Menu, Typography, MenuItem, Link, Button, Divider } from '@mui/material';

import AeternityLogo from '../base/icons/logo';
import ConnectWallet from './ConnectWallet';

const linkStyles = { marginLeft: 1, textDecoration: 'none', ':hover': { textDecoration: 'underline' } };

const NavigationBar = () => {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none', background: '#ffffff' }}>
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <AeternityLogo />
                    <Box sx={{ alignItems: 'center', display: { sm: 'flex', xs: 'none' } }}>
                        <Link sx={linkStyles} href="https://aeternity.com" target="_blank">
                            æternity Website
                        </Link>
                        <Link sx={linkStyles} href="https://wallet.superhero.com" target="_blank">
                            æternity Wallet
                        </Link>
                        <Divider flexItem orientation="vertical" sx={{ margin: 1, ml: 2 }} />
                        <ConnectWallet />
                    </Box>
                </Box>

                {/* <Divider flexItem orientation="vertical" sx={{ margin: 1 }} />
                <DarkLightSwitch /> */}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;

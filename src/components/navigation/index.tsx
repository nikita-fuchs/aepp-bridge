import { Box, Toolbar, AppBar, Divider } from '@mui/material';

import DarkLightSwitch from '../theme/DarkLightSwitch';
import AeternityLogo from '../base/icons/logo';

const NavigationBar = () => {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none', background: '#ffffff' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <AeternityLogo />
                </Box>

                {/* <Divider flexItem orientation="vertical" sx={{ margin: 1 }} />
                <DarkLightSwitch /> */}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;

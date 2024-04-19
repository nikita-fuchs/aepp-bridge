import { Box, Button } from '@mui/material';
import { Direction } from 'src/context/AppContext';
import useAppContext from 'src/hooks/useAppContext';
import useWalletContext from 'src/hooks/useWalletContext';

import EthereumIcon from 'src/components/base/icons/ethereum';
import AeternityIcon from 'src/components/base/icons/aeternity';

const shortenAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
};

const WalletConnect = () => {
    const { direction, ethereum, aeternity } = useAppContext();
    const { aeternityAddress, ethereumAddress, connectAeternityWallet, connectEthereumWallet, connecting } =
        useWalletContext();

    const connectedToAeternity = direction === Direction.AeternityToEthereum && aeternityAddress;
    const connectedToEthereum = direction === Direction.EthereumToAeternity && ethereumAddress;
    const connected = connectedToAeternity || connectedToEthereum;

    let content = <>Connect Wallet</>;
    let onClick = () => {};

    if (connected) {
        const shortAddress = shortenAddress(connectedToAeternity ? aeternityAddress : ethereumAddress);
        const showBalance = (connectedToEthereum && ethereum.balance) || (connectedToAeternity && aeternity.balance);
        content = (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {connectedToEthereum ? <EthereumIcon /> : <AeternityIcon />}
                    &nbsp;
                    {shortAddress}
                </Box>

                {showBalance && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {connectedToEthereum ? `${ethereum.balance}Ξ` : `${aeternity.balance}Æ`}
                    </Box>
                )}
            </Box>
        );
    } else {
        onClick = direction === Direction.AeternityToEthereum ? connectAeternityWallet : connectEthereumWallet;
    }

    return (
        <Button
            sx={{ display: 'flex', textTransform: 'none', fontSize: '15px' }}
            disabled={connecting}
            onClick={onClick}
        >
            {content}
        </Button>
    );
};

export default WalletConnect;

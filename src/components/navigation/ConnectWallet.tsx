import { Button } from '@mui/material';
import { Direction } from 'src/context/AppContext';
import useAppContext from 'src/hooks/useAppContext';
import useWalletContext from 'src/hooks/useWalletContext';

const shortenAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
};

const WalletConnect = () => {
    const { direction } = useAppContext();
    const { aeternityAddress, ethereumAddress, connectAeternityWallet, connectEthereumWallet, connecting } =
        useWalletContext();

    const connectedToAeternity = direction === Direction.AeternityToEthereum && aeternityAddress;
    const connectedToEthereum = direction === Direction.EthereumToAeternity && ethereumAddress;
    const connected = connectedToAeternity || connectedToEthereum;

    let text = 'Connect Wallet';
    let onClick = () => {};

    if (connected) {
        const shortAddress = shortenAddress(connectedToAeternity ? aeternityAddress : ethereumAddress);
        text = shortAddress;
    } else {
        onClick = direction === Direction.AeternityToEthereum ? connectAeternityWallet : connectEthereumWallet;
    }

    return (
        <Button
            sx={{ display: 'flex', textTransform: 'none', fontSize: '17px' }}
            disabled={connecting}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default WalletConnect;

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import useWalletContext, { RequiredWallet } from 'src/hooks/useWalletContext';

const WalletConnection: React.FC<{
    requiredWallet: RequiredWallet;
    children: React.ReactNode;
    onWalletConnectError: (e: string) => void;
}> = ({ requiredWallet, children, onWalletConnectError }) => {
    const {
        connectAeternityWallet,
        connectEthereumWallet,
        aeternityAddress,
        ethereumAddress,
        walletConnectError,
        connecting,
    } = useWalletContext();

    useEffect(() => onWalletConnectError(walletConnectError), [walletConnectError]);

    if (requiredWallet == RequiredWallet.Ethereum && !ethereumAddress) {
        return (
            <Button disabled={connecting} fullWidth variant="contained" onClick={connectEthereumWallet}>
                Connect Wallet
            </Button>
        );
    }

    if (requiredWallet == RequiredWallet.Aeternity && !aeternityAddress) {
        return (
            <Button disabled={connecting} fullWidth variant="contained" onClick={connectAeternityWallet}>
                Connect Wallet
            </Button>
        );
    }

    return <>{children}</>;
};
export default WalletConnection;

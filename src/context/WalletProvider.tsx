import React from 'react';
import * as Aeternity from 'src/services/aeternity';
import * as Ethereum from 'src/services/ethereum';
import Logger from '../services/logger';
import WalletContext from './WalletContext';

const WalletProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [connecting, setConnecting] = React.useState(false);
    const [aeternityAddress, setAeternityAddress] = React.useState<string>();
    const [ethereumAddress, setEthereumAddress] = React.useState<string>();
    const [walletConnectError, setWalletConnectError] = React.useState<string>('');

    React.useEffect(() => {
        const ethereumClient = (window as any).ethereum;

        if (ethereumClient) {
            console.log('Ethereum Provider:', Ethereum.Provider.provider);
            Ethereum.Provider.listAccounts().then((accounts) => {
                if (accounts.length > 0) {
                    setEthereumAddress(accounts[0]);
                }
            });
            ethereumClient.on('accountsChanged', (accounts: any) => {
                if (accounts.length > 0) {
                    setEthereumAddress(accounts[0]);
                } else {
                    setEthereumAddress(undefined);
                }
            });

            Aeternity.Sdk.onAddressChange = ({ current }) => {
                setAeternityAddress(Object.keys(current)[0]);
            };
        }
    }, []);

    const connectAeternityWallet = React.useCallback(async () => {
        try {
            setConnecting(true);
            const address = await Aeternity.connect();
            setAeternityAddress(address);
        } catch (e) {
            Logger.error(e);
            setWalletConnectError((e as Error).message);
        } finally {
            setConnecting(false);
        }
    }, []);

    const connectEthereumWallet = React.useCallback(async () => {
        if (!Ethereum.Provider) {
            setWalletConnectError('Ethereum wallet not available');
            return;
        }

        try {
            setConnecting(true);
            const address = await Ethereum.connect();
            setEthereumAddress(address);
        } catch (e) {
            Logger.error(e);
        } finally {
            setConnecting(false);
        }
    }, []);

    const disconnectWallet = React.useCallback(() => {
        if (ethereumAddress) {
            setEthereumAddress(undefined);
        } else if (aeternityAddress) {
            setAeternityAddress(undefined);
        }
    }, [ethereumAddress, aeternityAddress]);

    return (
        <WalletContext.Provider
            value={{
                connecting,
                aeternityAddress: aeternityAddress,
                ethereumAddress: ethereumAddress,
                connectAeternityWallet,
                connectEthereumWallet,
                walletConnectError,
                disconnectWallet,
            }}
        >
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

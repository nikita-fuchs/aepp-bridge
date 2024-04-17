import { createContext } from 'react';

export interface IWalletContext {
    aeternityAddress?: string;
    ethereumAddress?: string;
    connecting: boolean;
    connectAeternityWallet: () => Promise<void>;
    connectEthereumWallet: () => Promise<void>;
    walletConnectError: string;
}

const contextStub = {
    connecting: false,
    connectAeternityWallet: async () => {
        // stub
    },
    connectEthereumWallet: async () => {
        // stub
    },
    walletConnectError: '',
};

const WalletContext = createContext<IWalletContext>(contextStub);

export default WalletContext;

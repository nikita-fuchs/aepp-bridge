import { ethers, Contract } from 'ethers';
import Constants from 'src/constants';
import { bridgeConfig } from 'src/chainConfig';
import Logger from './logger';

export let Provider: ethers.providers.Web3Provider;
try {
    Provider = new ethers.providers.Web3Provider((window as any).ethereum);
    // (window as any).ethereum.request({ method: 'eth_chainId' }).then(console.log);
    (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Constants.isMainnet ? bridgeConfig.mainnet.chainId : bridgeConfig.testnet.chainId }],
    });
} catch {
    Logger.error('No web3 wallet found.');
}

export const connect = async (): Promise<string> => {
    // Connect to web3 wallet
    await Provider.send('eth_requestAccounts', []);

    return Provider.getSigner().getAddress();
};

export const isAddressValid = (address: string) => ethers.utils.isAddress(address);

export { Contract };

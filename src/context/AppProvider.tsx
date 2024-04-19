import React from 'react';
import AppContext, { AeternityBridgeInfo, EVMBridgeInfo, Direction } from './AppContext';
import * as Aeternity from 'src/services/aeternity';
import Constants, { Asset } from 'src/constants';
import Logger from 'src/services/logger';
import * as Ethereum from 'src/services/ethereum';
import useWalletContext from 'src/hooks/useWalletContext';
import BigNumber from 'bignumber.js';

async function fetchAeternityBridgeInfo(asset: Asset, aeternityAddress?: string): Promise<AeternityBridgeInfo> {
    const bridge_contract = await Aeternity.Sdk.initializeContract({
        aci: Constants.aeternity.bridge_aci,
        address: Constants.aeternity.bridge_address,
    });

    const { decodedResult: asset_address } = await bridge_contract.asset(asset.ethAddress);

    const asset_contract = await Aeternity.Sdk.initializeContract({
        aci: Constants.aeternity.asset_aci,
        address: asset_address,
    });

    let asset_balance = 0;
    if (aeternityAddress) {
        const { decodedResult } = await asset_contract.balance(aeternityAddress);
        asset_balance = decodedResult;
    }

    return {
        asset: {
            address: asset_address,
            balance: asset_balance?.toString() || '0',
        },
    };
}

async function fetchEvmBridgeInfo(assetAddress: string, ethereumAddress?: string): Promise<EVMBridgeInfo> {
    const asset = new Ethereum.Contract(
        assetAddress,
        [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'balanceOf',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ],
        Ethereum.Provider,
    );

    const balance = (await asset.balanceOf(ethereumAddress).catch(() => 0)).toString();
    return {
        asset: {
            address: assetAddress,
            balance,
        },
    };
}

const fetchEthereumBalance = async (address: string | undefined) => {
    if (!address) return;
    const balance = new BigNumber((await Ethereum.Provider.getBalance(address)).toString());

    return balance.shiftedBy(-18).toFormat(2, BigNumber.ROUND_DOWN);
};

const fetchAeternityBalance = async (address: string | undefined) => {
    if (!address) return;
    address = address.replace('ak_', '');

    const balance = await Aeternity.Sdk.getBalance(`ak_${address}`);

    return new BigNumber(balance.toString()).shiftedBy(-18).toFormat(2, BigNumber.ROUND_DOWN);
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isMounter = React.useRef(false);
    const { aeternityAddress, ethereumAddress } = useWalletContext();
    const [asset, updateAsset] = React.useState<Asset>(Constants.assets[0]);
    const [evmBridgeInfo, setEvmBridgeInfo] = React.useState<EVMBridgeInfo>();
    const [aeternityBridgeInfo, setAeternityBridgeInfo] = React.useState<AeternityBridgeInfo>();
    const [direction, updateDirection] = React.useState<Direction>(Direction.EthereumToAeternity);
    const [ethereumBalance, setEthereumBalance] = React.useState<string>();
    const [aeternityBalance, setAeternityBalance] = React.useState<string>();

    React.useEffect(() => {
        isMounter.current = true;

        const fetch = () => {
            // Ethereum
            fetchEvmBridgeInfo(asset.ethAddress, ethereumAddress)
                .then((info) => {
                    if (isMounter.current) {
                        setEvmBridgeInfo(info);
                    }
                })
                .catch(Logger.error);
            // Aeternity
            fetchAeternityBridgeInfo(asset, aeternityAddress)
                .then((info) => {
                    if (isMounter.current) {
                        setAeternityBridgeInfo(info);
                    }
                })
                .catch(Logger.error);

            fetchEthereumBalance(ethereumAddress).then(setEthereumBalance).catch(Logger.error);
            fetchAeternityBalance(aeternityAddress).then(setAeternityBalance).catch(Logger.error);
        };
        fetch(); // First fetch

        const cron = setInterval(fetch, 10000 /* 10 seconds */);
        return () => {
            isMounter.current = false;
            clearInterval(cron);
        };
    }, [ethereumAddress, asset, aeternityAddress]);

    return (
        <AppContext.Provider
            value={{
                asset,
                assets: Constants.assets,
                updateAsset: (asset: Asset) => {
                    updateAsset(asset);
                    setAeternityBridgeInfo({});
                    setEvmBridgeInfo({});
                },
                aeternity: {
                    bridgeInfo: aeternityBridgeInfo,
                    balance: aeternityBalance,
                },
                ethereum: {
                    bridgeInfo: evmBridgeInfo,
                    balance: ethereumBalance,
                },
                direction,
                updateDirection,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

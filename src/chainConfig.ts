const bridgeConfig = {
    mainnet: {
        chainId: '0x1',
        ae_bridge_address: 'ct_2ioisnF4reEMxWz4hkX5DhR4D6h83oW9ShHfAvs89E6PKqphA9',
        eth_bridge_address: '0xc9d9dB4a1774A12aCFA0a8d111A5375d59831629',
        etherscan: 'https://etherscan.io',
        aescan: 'https://aescan.io',
        aeRpc: 'https://mainnet.aeternity.io',
    },
    testnet: {
        chainId: '0xaa36a7',
        ae_bridge_address: 'ct_rCdFGvdiE4jEjNeqc3pLPuHHtwhRe5K28pNa2KLr4C6zLSZGg',
        eth_bridge_address: '0x637Fd9CA649712cbCecb4aE2E70ef53fb85b1047',
        etherscan: 'https://sepolia.etherscan.io',
        aescan: 'https://testnet.aescan.io',
        aeRpc: 'https://testnet.aeternity.io',
    },
};

const assets = {
    testnet: [
        {
            nameandsymbol: 'Tether USD (USDT)',
            name: 'Tether USD',
            symbol: 'USDT',
            decimals: 6,
            icon: 'https://static.alchemyapi.io/images/assets/825.png',
            ethAddress: '0x82641296e56A7B4D2d1548F7528C8a29Af520250',
            aeAddress: 'ct_5Zaz8bBmxbtAmqohs5VmcHChqUnc3pQoqv65o1GS6VJYLgY6P',
        },
    ],
    mainnet: [
        {
            nameandsymbol: 'Tether USD (USDT)',
            name: 'Tether USD',
            symbol: 'USDT',
            decimals: 6,
            icon: 'https://static.alchemyapi.io/images/assets/825.png',
            aeAddress: 'ct_2AiMceYFXnUdA6A9Lu2ZQ2tr2TpfbGVfkxLfBnceoWgHTKZYvc',
            ethAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        {
            nameandsymbol: 'USD Coin (USDC)',
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=032',
            aeAddress: 'ct_U1i8dzJTVWdnU2cv59TZQfLFpLfjqf7MQQC5ygSMKphn8Yew2',
            ethAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
    ],
};

export { bridgeConfig, assets };

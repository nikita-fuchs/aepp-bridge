const fs = require('fs');

const network = process.argv[2];

if (!['sepolia', 'mainnet'].includes(network)) {
    throw new Error(`Unexpected network: ${network}`);
}

const assets = JSON.parse(
    fs.readFileSync(`${__dirname}/../__SNAPSHOT__/${network}_assets.json`, { encoding: 'utf-8' }),
);
const bridge = JSON.parse(
    fs.readFileSync(`${__dirname}/../__SNAPSHOT__/${network}_bridge.json`, { encoding: 'utf-8' }),
);
const tokenInfo = JSON.parse(fs.readFileSync(`${__dirname}/../deploy/tokens.json`, { encoding: 'utf-8' }));

const bridge_aci = JSON.parse(fs.readFileSync(`${__dirname}/../__SNAPSHOT__/bridge.aci`, { encoding: 'utf-8' }));
const asset_aci = JSON.parse(fs.readFileSync(`${__dirname}/../__SNAPSHOT__/asset.aci`, { encoding: 'utf-8' }));

const bridge_abi = JSON.parse(fs.readFileSync(`${__dirname}/../__SNAPSHOT__/bridge.abi`, { encoding: 'utf-8' }));
const asset_abi = JSON.parse(fs.readFileSync(`${__dirname}/../__SNAPSHOT__/asset.abi`, { encoding: 'utf-8' }));

const deployment = {
    ethereum: {
        bridge_address: bridge.ethereum,
        chainId: '0xaa36a7',
        explorer: 'https://sepolia.etherscan.io',
        bridge_abi,
        asset_abi,
    },
    aeternity: {
        bridge_address: bridge.aeternity,
        explorer: 'https://testnet.aescan.io',
        rpc: 'https://testnet.aeternity.io',
        bridge_aci,
        asset_aci,
    },
    assets: [],
};

if (network == 'mainnet') {
    deployment.ethereum.chainId = '0x01';
    deployment.ethereum.chainId = 'https://etherscan.io';
    deployment.aeternity.explorer = 'https://aescan.io';
    deployment.aeternoty.rpc = 'https://mainnet.aeternity.io';
}

for (const token of tokenInfo) {
    if (assets[token.symbol]) {
        deployment.assets.push({
            ...token,
            ethAddress: assets[token.symbol].ethereum,
            aeAddress: assets[token.symbol].aeternity,
        });
    }
}

fs.writeFileSync(`${__dirname}/src/deployment.json`, JSON.stringify(deployment, null, 4), { encoding: 'utf-8' });

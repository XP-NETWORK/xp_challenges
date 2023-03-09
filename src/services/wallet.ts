import {
    //WalletConnectProvider,
    //ProxyProvider,
    ExtensionProvider,
} from "@elrondnetwork/erdjs";

import {chainName} from '../mockData'

// declare global {
//     interface Window { ethereum: any; }
// }

// window.ethereum = window.ethereum || {};


class Wallet {


    async connectMetamask():Promise<{address:string; chain: string} | undefined> {
        if (!window.ethereum) {
            alert('You have to intall MetaMask browser extension')
            return
        }


         await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });

        const [currentChain, accounts] = await Promise.all([window.ethereum.request({ method: 'eth_chainId' }), window.ethereum.request({ method: 'eth_requestAccounts' })])
      

        return {
            address: accounts[0],
            chain: chainName.find(c => c.chainId === Number(currentChain))?.name || ''
        }

    }

    async connectMaiarExtension() {
        const instance = ExtensionProvider.getInstance();
        await instance
            .init()
            .catch(() => window.open("https://getmaiar.com/defi", "_blank"));
        await instance.login();
        const {
            account: { address },
        } = instance;

        return {
            address,
            chain: chainName.find(c => c.chainId === 2)?.name || ''
        }
    }

}

export default () => new Wallet()
export type { Wallet }
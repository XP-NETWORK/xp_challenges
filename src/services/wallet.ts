import {
    //WalletConnectProvider,
    //ProxyProvider,
    ExtensionProvider,
} from "@elrondnetwork/erdjs";

declare global {
    interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {};


class Wallet {


    async connectMetamask() {
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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0]

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

        /* if (account?.name === "CanceledError") {
           throw new Error("CanceledError");
         }*/

        console.log(address);
    }

}

export default () => new Wallet()
export type { Wallet }
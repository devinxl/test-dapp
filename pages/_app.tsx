import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  bsc,
  bscTestnet,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { bnbGreenfieldTestnet, bscGreenfield } from '../config/chains';
import { trustWallet, metaMaskWallet, rainbowWallet, } from '@rainbow-me/rainbowkit/wallets';

const trustWalletGroup = {
  groupName: 'Custom',
  wallets: [trustWallet, metaMaskWallet, rainbowWallet]
};

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    bscTestnet,
    bsc,
    bscGreenfield,
    bnbGreenfieldTestnet,
  ],
  wallets: [trustWalletGroup],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;

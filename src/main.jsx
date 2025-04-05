import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(), // 使用默認 RPC
  },
  ssr: false,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <App />
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

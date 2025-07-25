'use client';

import { useWallet } from '@/contexts/WalletContext';
import {
    Wallet,
    LogOut,
    User,
    ArrowUpDown,
    DollarSign,
    Shield,
    Copy
} from 'lucide-react';

interface WalletConnectionProps {
    onOpenSwapModal?: () => void;
    onOpenFiatModal?: () => void;
}

export default function WalletConnection({
    onOpenSwapModal,
    onOpenFiatModal
}: WalletConnectionProps) {
    const { connection, connect, disconnect, isConnecting, error } = useWallet();

    console.log('WalletConnection - Current connection state:', connection);

    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="p-4 border-b border-gray-800 bg-black/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">DeFi Chat</div>
                            <div className="text-xs text-gray-400">
                                AI-Powered Trading Assistant
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {!connection.isConnected ? (
                        <>
                            {/* <button
                                onClick={connect}
                                disabled={isConnecting}
                                className="hidden flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                <Wallet className="w-4 h-4" />
                                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                            </button> */}
                            <button
                                onClick={connect}
                                disabled={isConnecting}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                <Wallet className="w-4 h-4" />
                                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={onOpenSwapModal}
                                className="flex items-center space-x-1 px-3 py-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 text-gray-200 text-sm rounded-lg transition-all duration-200 hover:scale-105"
                                title="Quick Swap"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                <span>Swap</span>
                            </button>

                            <button
                                onClick={onOpenFiatModal}
                                className="flex items-center space-x-1 px-3 py-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 text-gray-200 text-sm rounded-lg transition-all duration-200 hover:scale-105"
                                title="Convert to Fiat"
                            >
                                <DollarSign className="w-4 h-4" />
                                <span>Fiat</span>
                            </button>

                            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg group">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-200 font-mono">
                                    {formatAddress(connection.address)}
                                </span>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(connection.address || '')
                                    }
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    title="Copy Address"
                                >
                                    <Copy className="w-3 h-3 text-gray-400 hover:text-gray-200" />
                                </button>
                            </div>

                            <button
                                onClick={disconnect}
                                className="flex items-center justify-center w-10 h-10 bg-red-600/80 hover:bg-red-600 border border-red-500/50 text-white rounded-lg transition-all duration-200 hover:scale-105"
                                title="Disconnect"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="mt-3 p-3 bg-red-900/20 border border-red-600/30 rounded-lg text-red-200 text-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <span>{error}</span>
                        <button
                            onClick={() => {
                                // optionally clear error state if supported
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {connection.isConnected && (
                <div className="mt-3 flex items-center space-x-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Connected to Starknet • Ready for trading</span>
                </div>
            )}
        </div>
    );
}

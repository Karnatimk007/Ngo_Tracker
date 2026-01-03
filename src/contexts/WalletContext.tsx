import React, { createContext, useContext, useState, useCallback } from 'react';
import { Wallet, UserRole } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface WalletContextType {
  wallet: Wallet | null;
  role: UserRole;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  setRole: (role: UserRole) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [role, setRole] = useState<UserRole>('public');
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockWallet: Wallet = {
      address: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
      balance: (Math.random() * 100).toFixed(4),
      isConnected: true,
    };
    
    setWallet(mockWallet);
    setIsConnecting(false);
    
    toast({
      title: "Wallet Connected",
      description: `Connected to ${mockWallet.address}`,
    });
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
    setRole('public');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, role, isConnecting, connect, disconnect, setRole }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

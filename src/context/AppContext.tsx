import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Card {
    id: string;
    name: string;
    set: string;
    number: string;
    rarity: string;
    image: string;
    prices: {
        mint: number;
        nearMint: number;
        lightlyPlayed: number;
        heavilyPlayed: number;
    };
}

interface AppContextType {
    isLoggedIn: boolean;
    user: { name: string; email: string } | null;
    scannedCards: Card[];
    isLoading: boolean;
    login: (userData: { name: string; email: string }) => void;
    logout: () => void;
    addScannedCard: (card: Card) => void;
    finishLoading: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [scannedCards, setScannedCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const login = (userData: { name: string; email: string }) => {
        setIsLoggedIn(true);
        setUser(userData);
        setIsLoading(false);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setScannedCards([]);
    };

    const addScannedCard = (card: Card) => {
        setScannedCards(prev => [...prev, card]);
    };

    const finishLoading = () => {
        setIsLoading(false);
    };

    return (
        <AppContext.Provider value={{
            isLoggedIn,
            user,
            scannedCards,
            isLoading,
            login,
            logout,
            addScannedCard,
            finishLoading
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
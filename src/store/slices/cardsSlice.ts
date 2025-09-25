import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface CardsState {
    cards: Card[];
    scannedCards: Card[];
    selectedCard: Card | null;
}

const initialState: CardsState = {
    cards: [],
    scannedCards: [],
    selectedCard: null,
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addScannedCard: (state, action: PayloadAction<Card>) => {
            state.scannedCards.push(action.payload);
        },
        setSelectedCard: (state, action: PayloadAction<Card>) => {
            state.selectedCard = action.payload;
        },
    },
});

export const { addScannedCard, setSelectedCard } = cardsSlice.actions;
export default cardsSlice.reducer;
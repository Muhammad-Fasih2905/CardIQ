import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import GlobalIcon from '../components/GlobalIcon';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { scannedCards } = useApp();

    // Hardcoded sample data
    const sampleCards = [
        {
            id: '1',
            name: 'Rapidash',
            set: 'Base Set 2',
            number: '28/180',
            rarity: 'Uncommon',
            image: 'https://images.pokemontcg.io/base2/28_hires.png',
            prices: {
                mint: 43.00,
                nearMint: 15.00,
                lightlyPlayed: 8.50,
                heavilyPlayed: 2.20
            }
        },
        {
            id: '2',
            name: 'Pikachu',
            set: 'Base Set',
            number: '58/102',
            rarity: 'Common',
            image: 'https://images.pokemontcg.io/base1/58_hires.png',
            prices: {
                mint: 17.92,
                nearMint: 12.50,
                lightlyPlayed: 7.80,
                heavilyPlayed: 3.20
            }
        },
        {
            id: '3',
            name: 'Blastoise',
            set: 'BASE Set',
            number: '2/102',
            rarity: 'Rare',
            image: 'https://images.pokemontcg.io/base1/2_hires.png',
            prices: {
                mint: 670.00,
                nearMint: 450.00,
                lightlyPlayed: 280.00,
                heavilyPlayed: 150.00
            }
        }
    ];

    const displayCards = scannedCards.length > 0 ? scannedCards : sampleCards;

    const renderCardItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.cardItem}
            onPress={() => navigation.navigate('CardDetail', { card: item })}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardSet}>{item.set}</Text>
                <View style={styles.cardMeta}>
                    <GlobalIcon library="MaterialIcons" name="attach-money" size={16} color={COLORS.secondary} />
                    <Text style={styles.cardPrice}>${item.prices.nearMint}</Text>
                </View>
            </View>
            <GlobalIcon library="Ionicons" name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <GlobalIcon library="FontAwesome5" name="dragon" size={32} color={COLORS.white} />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>CardIQ</Text>
                        <Text style={styles.headerSubtitle}>Your Pokemon Collection</Text>
                    </View>
                </View>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <GlobalIcon library="Foundation" name="clipboard-notes" size={28} color={COLORS.primary} />
                    <Text style={styles.statNumber}>{displayCards.length}</Text>
                    <Text style={styles.statLabel}>Total Cards</Text>
                </View>
                <View style={styles.statItem}>
                    <GlobalIcon library="FontAwesome" name="dollar" size={28} color={COLORS.primary} />
                    <Text style={styles.statNumber}>
                        ${displayCards.reduce((sum, card) => sum + card.prices.nearMint, 0).toFixed(2)}
                    </Text>
                    <Text style={styles.statLabel}>Collection Value</Text>
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Scanner')}
                >
                    <GlobalIcon library="MaterialCommunityIcons" name="camera-wireless" size={24} color={COLORS.text} />
                    <Text style={styles.actionButtonText}>Scan New Card</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Cards */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <GlobalIcon library="Ionicons" name="albums" size={24} color={COLORS.text} />
                    <Text style={styles.sectionTitle}>
                        {scannedCards.length > 0 ? 'Your Scanned Cards' : 'Sample Collection'}
                    </Text>
                </View>
                <FlatList
                    data={displayCards}
                    renderItem={renderCardItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.primary,
        padding: 20,
        paddingTop: 50,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    headerSubtitle: {
        fontSize: 16,
        color: COLORS.white,
        opacity: 0.8,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        margin: 15,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 5,
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.text,
        marginTop: 5,
    },
    actionsContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: COLORS.accent,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    section: {
        padding: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    cardItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
    },
    cardImage: {
        width: 60,
        height: 84,
        borderRadius: 8,
    },
    cardInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    cardSet: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 2,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        gap: 5,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
});

export default HomeScreen;
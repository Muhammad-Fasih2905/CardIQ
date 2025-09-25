import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import GlobalIcon from '../components/GlobalIcon';

const { width } = Dimensions.get('window');

type CardDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CardDetail'>;

const CardDetailScreen = () => {
    const navigation = useNavigation<CardDetailScreenNavigationProp>();
    const route = useRoute();
    const { card } = route.params as { card: any };

    const PriceRow = ({ condition, price, recommended }: { condition: string; price: number; recommended?: boolean }) => (
        <View style={[styles.priceRow, recommended && styles.recommendedPrice]}>
            <Text style={styles.conditionText}>{condition}</Text>
            <View style={styles.priceContainer}>
                <GlobalIcon library="FontAwesome" name="dollar" size={16} color={COLORS.secondary} />
                <Text style={styles.priceValue}>{price.toFixed(2)}</Text>
            </View>
            {recommended && (
                <View style={styles.recommendedBadge}>
                    <GlobalIcon library="Ionicons" name="star" size={12} color={COLORS.accent} />
                    <Text style={styles.recommendedTag}>Recommended</Text>
                </View>
            )}
        </View>
    );

    const handleAddToCollection = () => {
        // Add to collection logic here
        // alert(`${card.name} added to collection!`);
    };

    const handleSetPriceAlert = () => {
        // Set price alert logic here
        // alert(`Price alert set for ${card.name}!`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <GlobalIcon library="Ionicons" name="arrow-back" size={24} color={COLORS.white} />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Card Details</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Card Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: card.image }} style={styles.cardImage} />
                <View style={styles.cardBadge}>
                    <GlobalIcon library="FontAwesome5" name="certificate" size={16} color={COLORS.accent} />
                    <Text style={styles.cardBadgeText}>{card.rarity}</Text>
                </View>
            </View>

            {/* Card Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.cardName}>{card.name}</Text>

                <View style={styles.cardMeta}>
                    <View style={styles.metaItem}>
                        <GlobalIcon library="Ionicons" name="albums" size={16} color={COLORS.primary} />
                        <Text style={styles.metaText}>{card.set}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <GlobalIcon library="MaterialIcons" name="tag" size={16} color={COLORS.gray} />
                        <Text style={styles.metaText}>{card.number}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <GlobalIcon library="FontAwesome" name="star" size={16} color={COLORS.accent} />
                        <Text style={styles.metaText}>{card.rarity}</Text>
                    </View>
                </View>

                {/* Pricing Section */}
                <View style={styles.pricingSection}>
                    <View style={styles.sectionHeader}>
                        <GlobalIcon library="FontAwesome" name="dollar" size={20} color={COLORS.text} />
                        <Text style={styles.sectionTitle}>Market Prices</Text>
                    </View>

                    <PriceRow condition="Mint" price={card.prices.mint} />
                    <PriceRow condition="Near Mint" price={card.prices.nearMint} recommended />
                    <PriceRow condition="Lightly Played" price={card.prices.lightlyPlayed} />
                    <PriceRow condition="Heavily Played" price={card.prices.heavilyPlayed} />

                    <View style={styles.recommendedBuy}>
                        <View style={styles.recommendedBuyHeader}>
                            <GlobalIcon library="MaterialIcons" name="thumb-up" size={18} color={COLORS.primary} />
                            <Text style={styles.recommendedBuyText}>Recommended Buy Price</Text>
                        </View>
                        <View style={styles.recommendedPriceContainer}>
                            <GlobalIcon library="FontAwesome" name="dollar" size={20} color={COLORS.primary} />
                            <Text style={styles.recommendedBuyPrice}>{card.prices.nearMint.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Grading Section */}
                <View style={styles.gradingSection}>
                    <View style={styles.sectionHeader}>
                        <GlobalIcon library="MaterialIcons" name="grading" size={20} color={COLORS.text} />
                        <Text style={styles.sectionTitle}>Grading Estimate</Text>
                    </View>
                    <View style={styles.gradingMetrics}>
                        <View style={styles.metric}>
                            <GlobalIcon library="MaterialIcons" name="center-focus-strong" size={24} color={COLORS.primary} />
                            <Text style={styles.metricLabel}>Centering</Text>
                            <Text style={styles.metricValue}>87/48 80/50</Text>
                        </View>
                        <View style={styles.metric}>
                            <GlobalIcon library="FontAwesome" name="check-circle" size={24} color={COLORS.primary} />
                            <Text style={styles.metricLabel}>Condition</Text>
                            <Text style={styles.metricValue}>Excellent</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleAddToCollection}>
                        <GlobalIcon library="MaterialIcons" name="add-shopping-cart" size={20} color={COLORS.white} />
                        <Text style={styles.primaryButtonText}>Add to Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleSetPriceAlert}>
                        <GlobalIcon library="MaterialIcons" name="notifications" size={20} color={COLORS.white} />
                        <Text style={styles.secondaryButtonText}>Price Alert</Text>
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingTop: 50,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    backButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    headerSpacer: {
        width: 60,
    },
    imageContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    cardImage: {
        width: width * 0.7,
        height: width * 1.0,
        resizeMode: 'contain',
    },
    cardBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 222, 0, 0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 5,
    },
    cardBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    infoContainer: {
        padding: 20,
    },
    cardName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
        textAlign: 'center',
    },
    cardMeta: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
        flexWrap: 'wrap',
        gap: 10,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 5,
    },
    metaText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '500',
    },
    pricingSection: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
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
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    recommendedPrice: {
        backgroundColor: 'rgba(255, 222, 0, 0.1)',
        marginHorizontal: -20,
        paddingHorizontal: 20,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.accent,
    },
    conditionText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
        flex: 1,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    priceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    recommendedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 222, 0, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        gap: 4,
        marginLeft: 10,
    },
    recommendedTag: {
        fontSize: 12,
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    recommendedBuy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: COLORS.primary,
    },
    recommendedBuyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    recommendedBuyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    recommendedPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    recommendedBuyPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    gradingSection: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    gradingMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
    },
    metric: {
        alignItems: 'center',
        flex: 1,
    },
    metricLabel: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 8,
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    primaryButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    secondaryButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CardDetailScreen;
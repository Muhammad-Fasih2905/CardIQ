import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../utils/constants';

const ProfileScreen = ({ navigation }: any) => {
    const { user, scannedCards, logout } = useApp();

    const handleLogout = () => {
        logout();
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{user?.name || 'Pokemon Trainer'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'trainer@cardiq.com'}</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{scannedCards.length}</Text>
                    <Text style={styles.statLabel}>Cards Scanned</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        ${scannedCards.reduce((sum, card) => sum + card.prices.nearMint, 0).toFixed(2)}
                    </Text>
                    <Text style={styles.statLabel}>Collection Value</Text>
                </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>📊 Collection Analytics</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>💰 Price Alerts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>⚙️ Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>📚 Help & Support</Text>
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
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
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.white,
        marginBottom: 15,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 5,
    },
    userEmail: {
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
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.text,
        marginTop: 5,
    },
    menuSection: {
        margin: 15,
    },
    menuItem: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    menuText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        margin: 15,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
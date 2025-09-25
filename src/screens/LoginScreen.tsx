import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../utils/constants';

const LoginScreen = () => {
    const { login } = useApp();

    const handleLogin = () => {
        login({ name: 'Pokemon Trainer', email: 'trainer@cardiq.com' });
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/188/188987.png' }}
                style={styles.logo}
            />
            <Text style={styles.title}>CardIQ</Text>
            <Text style={styles.subtitle}>Your Pokemon Card Collection Manager</Text>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Enter App</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={handleLogin}>
                <Text style={styles.skipButtonText}>Skip Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 40,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipButton: {
        paddingVertical: 10,
    },
    skipButtonText: {
        color: COLORS.secondary,
        fontSize: 16,
    },
});

export default LoginScreen;
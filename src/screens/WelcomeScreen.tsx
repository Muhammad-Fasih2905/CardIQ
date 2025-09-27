// WelcomeScreen.tsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.brandName}>Mandawi</Text>
                <Text style={styles.subBrand}>Sgiao</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Get Started</Text>

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('SignUpScreen')}
                >
                    <Text style={styles.primaryButtonText}>Get Started</Text>
                </TouchableOpacity>

                {/* Login Section */}
                <View style={styles.loginSection}>
                    <Text style={styles.loginText}>Have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        alignItems: 'center',
        marginTop: height * 0.1,
    },
    brandName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        letterSpacing: 1,
    },
    subBrand: {
        fontSize: 18,
        color: '#666666',
        marginTop: 4,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 40,
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: '#000000',
        width: width * 0.8,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    loginSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#666666',
    },
    loginLink: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default WelcomeScreen;
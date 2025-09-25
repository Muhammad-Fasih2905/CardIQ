import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import GlobalIcon from '../components/GlobalIcon';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    // Animations create karen
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);
    const slideAnim = new Animated.Value(50);
    const rotateAnim = new Animated.Value(0);

    useEffect(() => {
        // Complex animation sequence
        Animated.parallel([
            // Fade in animation
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),

            // Scale animation
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 3,
                useNativeDriver: true,
            }),

            // Slide up animation
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5)),
            }),

            // Rotate animation for Pokeball
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                })
            ),
        ]).start();

        // 3 seconds ke baad login screen pe navigate karen
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Animated Background */}
            <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
                <View style={styles.bgCircle1} />
                <View style={styles.bgCircle2} />
                <View style={styles.bgCircle3} />
            </Animated.View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Animated Pokeball */}
                <Animated.View
                    style={[
                        styles.pokeballContainer,
                        {
                            transform: [
                                { scale: scaleAnim },
                                { translateY: slideAnim },
                                { rotate: rotateInterpolate }
                            ]
                        }
                    ]}
                >
                    <View style={styles.pokeball}>
                        <View style={styles.pokeballTop} />
                        <View style={styles.pokeballCenter}>
                            <View style={styles.pokeballButton} />
                        </View>
                        <View style={styles.pokeballBottom} />
                    </View>
                </Animated.View>

                {/* App Title */}
                <Animated.View
                    style={[
                        styles.titleContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <Text style={styles.title}>CardIQ</Text>
                    <Text style={styles.subtitle}>Pokémon Card Collection</Text>
                </Animated.View>

                {/* Animated Loading Dots */}
                <Animated.View
                    style={[
                        styles.loadingContainer,
                        { opacity: fadeAnim }
                    ]}
                >
                    <Text style={styles.loadingText}>Loading your collection</Text>
                    <View style={styles.dotsContainer}>
                        {[0, 1, 2].map((index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        transform: [
                                            {
                                                scale: fadeAnim.interpolate({
                                                    inputRange: [0, 0.5, 1],
                                                    outputRange: [0.3, 1.2, 1],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </Animated.View>

                {/* Pokemon Characters */}
                <Animated.View
                    style={[
                        styles.pokemonCharacters,
                        { opacity: fadeAnim }
                    ]}
                >
                    <GlobalIcon
                        library="FontAwesome5"
                        name="dragon"
                        size={40}
                        color={COLORS.accent}
                        style={styles.pikachu}
                    />
                    <GlobalIcon
                        library="FontAwesome5"
                        name="fire"
                        size={35}
                        color="#FF6B6B"
                        style={styles.charmander}
                    />
                    <GlobalIcon
                        library="FontAwesome5"
                        name="tint"
                        size={35}
                        color="#4ECDC4"
                        style={styles.squirtle}
                    />
                </Animated.View>

                {/* Footer */}
                <Animated.View
                    style={[
                        styles.footer,
                        { opacity: fadeAnim }
                    ]}
                >
                    <Text style={styles.footerText}>Powered by React Native</Text>
                    <Text style={styles.versionText}>v1.0.0</Text>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    bgCircle1: {
        position: 'absolute',
        top: -100,
        right: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    bgCircle2: {
        position: 'absolute',
        bottom: -100,
        left: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 222, 0, 0.1)',
    },
    bgCircle3: {
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(59, 76, 202, 0.1)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    pokeballContainer: {
        marginBottom: 30,
    },
    pokeball: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        borderWidth: 8,
        borderColor: '#000000',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    pokeballTop: {
        height: '45%',
        backgroundColor: '#FF0000',
        borderBottomWidth: 4,
        borderBottomColor: '#000000',
    },
    pokeballCenter: {
        height: '10%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokeballButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderColor: '#000000',
    },
    pokeballBottom: {
        height: '45%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 4,
        borderTopColor: '#000000',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#FFFFFF',
        opacity: 0.9,
        textAlign: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    loadingText: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.8,
        marginBottom: 10,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    pokemonCharacters: {
        position: 'absolute',
        bottom: 120,
        flexDirection: 'row',
        gap: 30,
    },
    pikachu: {
        transform: [{ translateY: -5 }],
    },
    charmander: {
        transform: [{ translateY: 10 }],
    },
    squirtle: {
        transform: [{ translateY: 5 }],
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#FFFFFF',
        opacity: 0.7,
        marginBottom: 5,
    },
    versionText: {
        fontSize: 10,
        color: '#FFFFFF',
        opacity: 0.5,
    },
});

export default SplashScreen;
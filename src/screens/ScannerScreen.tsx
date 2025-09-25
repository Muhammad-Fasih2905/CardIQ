import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useApp } from '../context/AppContext';
import { COLORS } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import GlobalIcon from '../components/GlobalIcon';

type ScannerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const ScannerScreen = () => {
    const navigation = useNavigation<ScannerScreenNavigationProp>();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isActive, setIsActive] = useState(true);
    const device = useCameraDevice('back');
    const { addScannedCard } = useApp();

    // Camera permission manage karna
    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'CardIQ needs access to your camera to scan Pokemon cards',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
                } else {
                    const permission = await Camera.requestCameraPermission();
                    setHasPermission(permission === 'granted');
                }
            } catch (err) {
                console.error('Permission error:', err);
                setHasPermission(false);
            }
        };

        requestCameraPermission();
    }, []);

    // Barcode scanning handler
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes) => {
            if (codes.length > 0 && isActive) {
                setIsActive(false);
                const scannedData = codes[0].value;

                if (scannedData) {
                    handleCardScan(scannedData);
                }
            }
        },
    });

    const handleCardScan = (data: string) => {
        const mockCard = {
            id: Date.now().toString(),
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
        };

        addScannedCard(mockCard);

        Alert.alert(
            'Card Scanned Successfully! 🎉',
            `Identified: ${mockCard.name}\nSet: ${mockCard.set}\nValue: $${mockCard.prices.nearMint}`,
            [
                {
                    text: 'View Details',
                    onPress: () => navigation.navigate('CardDetail', { card: mockCard })
                },
                {
                    text: 'Scan Another',
                    onPress: () => setIsActive(true)
                }
            ]
        );
    };

    const handleManualScan = () => {
        const mockCard = {
            id: Date.now().toString(),
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
        };

        addScannedCard(mockCard);

        Alert.alert(
            'Demo Card Added!',
            `Added: ${mockCard.name} - ${mockCard.set}`,
            [
                {
                    text: 'View Details',
                    onPress: () => navigation.navigate('CardDetail', { card: mockCard })
                },
                {
                    text: 'OK',
                    onPress: () => setIsActive(true)
                }
            ]
        );
    };

    if (hasPermission === null) {
        return (
            <View style={styles.loadingContainer}>
                <GlobalIcon library="Feather" name="camera" size={60} color={COLORS.primary} />
                <Text style={styles.loadingText}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.permissionContainer}>
                <GlobalIcon library="MaterialIcons" name="camera-off" size={80} color={COLORS.primary} />
                <Text style={styles.permissionTitle}>Camera Access Required</Text>
                <Text style={styles.permissionMessage}>
                    CardIQ needs camera access to scan Pokemon cards. Please enable camera permissions in your device settings.
                </Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={() => {
                        setHasPermission(null);
                        Camera.requestCameraPermission().then(permission => {
                            setHasPermission(permission === 'granted');
                        });
                    }}
                >
                    <GlobalIcon library="MaterialIcons" name="camera" size={20} color={COLORS.white} />
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.permissionButton, styles.demoButton]}
                    onPress={handleManualScan}
                >
                    <GlobalIcon library="FontAwesome5" name="dice" size={20} color={COLORS.white} />
                    <Text style={styles.permissionButtonText}>Try Demo Mode</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (device == null) {
        return (
            <View style={styles.errorContainer}>
                <GlobalIcon library="MaterialIcons" name="error-outline" size={60} color={COLORS.primary} />
                <Text style={styles.errorText}>Camera device not available</Text>
                <TouchableOpacity
                    style={styles.demoButton}
                    onPress={handleManualScan}
                >
                    <GlobalIcon library="FontAwesome5" name="dice" size={20} color={COLORS.white} />
                    <Text style={styles.demoButtonText}>Use Demo Mode</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={isActive}
                codeScanner={codeScanner}
                zoom={0.5}
            />

            {/* Overlay with scan frame */}
            <View style={styles.overlay}>
                <View style={styles.scanFrame}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
                <Text style={styles.scanText}>Align Pokemon card within the frame</Text>

                {!isActive && (
                    <View style={styles.scanSuccessContainer}>
                        <GlobalIcon library="MaterialIcons" name="check-circle" size={30} color={COLORS.accent} />
                        <Text style={styles.scanSuccessText}>Card Scanned!</Text>
                    </View>
                )}
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => navigation.goBack()}
                >
                    <GlobalIcon library="Ionicons" name="arrow-back" size={20} color={COLORS.white} />
                    <Text style={styles.controlButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, styles.scanButton]}
                    onPress={() => setIsActive(!isActive)}
                >
                    <GlobalIcon
                        library="Ionicons"
                        name={isActive ? "pause" : "play"}
                        size={20}
                        color={COLORS.white}
                    />
                    <Text style={styles.controlButtonText}>
                        {isActive ? 'Pause' : 'Resume'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, styles.demoButton]}
                    onPress={handleManualScan}
                >
                    <GlobalIcon library="FontAwesome5" name="dice" size={20} color={COLORS.white} />
                    <Text style={styles.controlButtonText}>Demo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    scanFrame: {
        width: 280,
        height: 380,
        borderWidth: 2,
        borderColor: COLORS.accent,
        backgroundColor: 'transparent',
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderColor: COLORS.accent,
    },
    topLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderTopLeftRadius: 8,
    },
    topRight: {
        top: -2,
        right: -2,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderTopRightRadius: 8,
    },
    bottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderBottomLeftRadius: 8,
    },
    bottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderBottomRightRadius: 8,
    },
    scanText: {
        color: COLORS.white,
        fontSize: 16,
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scanSuccessContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    scanSuccessText: {
        color: COLORS.accent,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    controlButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        gap: 8,
    },
    scanButton: {
        backgroundColor: COLORS.secondary,
    },
    demoButton: {
        backgroundColor: COLORS.accent,
    },
    controlButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 30,
    },
    loadingText: {
        fontSize: 18,
        color: COLORS.text,
        marginTop: 20,
        textAlign: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 30,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 15,
        marginTop: 20,
        textAlign: 'center',
    },
    permissionMessage: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    permissionButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    permissionButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 30,
    },
    errorText: {
        fontSize: 18,
        color: COLORS.text,
        marginBottom: 20,
        marginTop: 15,
        textAlign: 'center',
    },
    demoButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ScannerScreen;
// SignUpScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SignUpScreen: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: 'nondessampid@gmail.com',
        phone: '+11650143224',
        password: '',
        confirmPassword: '',
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [wantsMarketingEmails, setWantsMarketingEmails] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigation = useNavigation();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSignUp = () => {
        if (validateForm()) {
            // Handle successful sign up
            console.log('Sign up successful', formData);
        }
    };

    const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
        <Text style={[styles.requirementText, { color: met ? '#4CAF50' : '#666666' }]}>
            {met ? '✓ ' : '• '}{text}
        </Text>
    );

    const isPasswordValid = {
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Join Chowk and start buying & selling</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            <View style={[styles.inputContainer, styles.halfInput, errors.firstName && styles.inputError]}>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.firstName}
                                    onChangeText={(text) => handleInputChange('firstName', text)}
                                    placeholder="John"
                                    placeholderTextColor="#999"
                                />
                                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                            </View>

                            <View style={[styles.inputContainer, styles.halfInput, errors.lastName && styles.inputError]}>
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.lastName}
                                    onChangeText={(text) => handleInputChange('lastName', text)}
                                    placeholder="Doe"
                                    placeholderTextColor="#999"
                                />
                                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                            </View>
                        </View>

                        {/* Email */}
                        <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#999"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        {/* Phone */}
                        <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => handleInputChange('phone', text)}
                                keyboardType="phone-pad"
                                placeholderTextColor="#999"
                            />
                            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                        </View>

                        {/* Password */}
                        <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                                secureTextEntry
                                placeholder="Create a strong password"
                                placeholderTextColor="#999"
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        {/* Confirm Password */}
                        <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                secureTextEntry
                                placeholder="Confirm your password"
                                placeholderTextColor="#999"
                            />
                            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                        </View>

                        {/* Password Requirements */}
                        <View style={styles.requirements}>
                            <Text style={styles.requirementsTitle}>Password must contain:</Text>
                            <PasswordRequirement met={isPasswordValid.length} text="At least 8 characters" />
                            <PasswordRequirement met={isPasswordValid.uppercase} text="One uppercase letter" />
                            <PasswordRequirement met={isPasswordValid.number} text="One number" />
                        </View>

                        {/* Checkboxes */}
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => setAgreedToTerms(!agreedToTerms)}
                            >
                                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                                    {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.checkboxText}>
                                    I agree to the Terms of Service and Privacy Policy
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => setWantsMarketingEmails(!wantsMarketingEmails)}
                            >
                                <View style={[styles.checkbox, wantsMarketingEmails && styles.checkboxChecked]}>
                                    {wantsMarketingEmails && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.checkboxText}>
                                    I want to receive marketing emails and updates
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

                        {/* Create Account Button */}
                        <TouchableOpacity
                            style={[styles.createButton, (!agreedToTerms || !formData.password) && styles.createButtonDisabled]}
                            onPress={handleSignUp}
                            disabled={!agreedToTerms || !formData.password}
                        >
                            <Text style={styles.createButtonText}>Create Account</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Or sign up with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Social Buttons */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Continue with Apple</Text>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.loginLinkContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 32,
    },
    form: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    inputContainer: {
        marginBottom: 16,
    },
    halfInput: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: '#ff0000',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginTop: 4,
    },
    requirements: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 6,
    },
    requirementText: {
        fontSize: 12,
        marginBottom: 2,
    },
    checkboxContainer: {
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxText: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        lineHeight: 20,
    },
    createButton: {
        backgroundColor: '#000000',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    createButtonDisabled: {
        backgroundColor: '#cccccc',
        shadowOpacity: 0,
        elevation: 0,
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#666666',
    },
    socialButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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

export default SignUpScreen;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useApp } from '../context/AppContext';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import CardDetailScreen from '../screens/CardDetailScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { isLoggedIn } = useApp();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoggedIn ? "MainTabs" : "Login"}
        >
            {!isLoggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                    <Stack.Screen
                        name="CardDetail"
                        component={CardDetailScreen}
                        options={{
                            headerShown: true,
                            headerTitle: 'Card Details',
                            headerStyle: { backgroundColor: '#FF0000' },
                            headerTintColor: '#FFFFFF',
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
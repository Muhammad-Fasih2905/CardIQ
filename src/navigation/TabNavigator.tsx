import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../utils/constants';
import { TabParamList } from '../types/navigation';
import GlobalIcon from '../components/GlobalIcon';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                headerStyle: {
                    backgroundColor: COLORS.primary,
                    height: 100,
                },
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                headerTintColor: COLORS.white,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <GlobalIcon
                            library="Ionicons"
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                    title: 'My Collection',
                    headerTitle: 'My Pokemon Collection',
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={ScannerScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <GlobalIcon
                            library="MaterialCommunityIcons"
                            name={focused ? "camera-wireless" : "camera-wireless-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                    title: 'Scan Card',
                    headerTitle: 'Scan Pokemon Card',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <GlobalIcon
                            library="Ionicons"
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                    title: 'Profile',
                    headerTitle: 'Trainer Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
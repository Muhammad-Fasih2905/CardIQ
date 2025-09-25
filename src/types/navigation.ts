export type RootStackParamList = {
    Login: undefined;
    SplashScreen: undefined;
    MainTabs: undefined;
    CardDetail: { card: any };
};

export type TabParamList = {
    Home: undefined;
    Scanner: undefined;
    Profile: undefined;
};

// Declare navigation types globally
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
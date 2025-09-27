export type RootStackParamList = {
    WelcomeScreen: undefined;
    SignUpScreen: undefined;
};
// Declare navigation types globally
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
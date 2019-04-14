import React from 'react';
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginForm from './app/components/LoginForm';
import RegisterForm from './app/components/RegisterForm';
import HomeForm from './app/components/HomeForm';
import SettingsForm from './app/components/SettingsForm';
import TutorialForm from './app/components/TutorialForm';
import PortfolioForm from './app/components/PortfolioForm';

export default class App extends React.Component {  
  render() {
    return <AppContainer />;
  }
}

const DashBoardStackNavigator = createStackNavigator({
	Market: { screen: HomeForm },
	Tutorial: { screen: TutorialForm}
});

const DashboardTabNavigator = createBottomTabNavigator({
  Market: { screen: DashBoardStackNavigator },
  Portfolio: { screen: PortfolioForm},
  Settings: { screen: SettingsForm},
});

const AppContainer = createAppContainer(createSwitchNavigator({
    Login: { screen: LoginForm },
	Register: { screen: RegisterForm },
	Home: { screen: DashboardTabNavigator },
}));
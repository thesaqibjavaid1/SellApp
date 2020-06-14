import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignIn from './components/auth';
import SignUp from './components/auth/signUp';
import Home from './components/home';
import Sell from './components/sellit';

const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#50BE72',
    },
    headerTintColor: 'white',
    headerTitle: 'Sell It',
  },
};
const HomeStack = createStackNavigator(
  {
    Home: Home,
  },
  headerConf,
);
const SellStack = createStackNavigator(
  {
    Sell: Sell,
  },
  headerConf,
);
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Sell: SellStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#50BE72',
      showLabel: false,
      inactiveBackgroundColorColor: '#3e2465',
    },
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Sell') {
          iconName = 'ios-options';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);
const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
  },
  {
    headerMode: 'none',
  },
);

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'Auth',
      },
    ),
  );
};

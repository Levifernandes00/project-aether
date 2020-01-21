import React from 'react';
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";
import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';


import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterProfile from "./pages/RegisterProfile";
import RegisterStartup from "./pages/RegisterStartup";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Loading from "./pages/Loading";
import Startup from "./pages/Startup";



const registerTab = createMaterialTopTabNavigator(
    {
        Profile: RegisterProfile,
        Startup: RegisterStartup
    },
    {
        tabBarOptions: {
           
            activeTintColor: '#403BEB',
            inactiveTintColor: '#999',
            tabStyle: { 
                paddingTop: 30,
                backgroundColor: '#F5F5F5',
            },
            labelStyle: { 
                fontSize: 14,
                
            },
        },
        
    }
);


const authStack = createStackNavigator(
    {
        Login,
        Register: registerTab,
    },
    {
        headerMode: 'none',
    }
);

const profileManagementStack = createStackNavigator(
    {
        Profile,
        Startup,
    },
    {
        headerMode: 'none',
    }
)

const appTab = createBottomTabNavigator(
    {
        Explore,
        Home,
        Profile: profileManagementStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
              
                const { routeName } = navigation.state

                let iconName = undefined
                let IconComponent = undefined
        
                switch(routeName) {
                    case 'Explore':
                      iconName = 'explore'
                      IconComponent = MaterialIcons
                      break
                    case 'Home':
                      iconName = 'home'
                      IconComponent = Entypo
                      break
                    case 'Profile':
                      iconName = 'user'
                      IconComponent = Feather
                      break
                  }
                return (<IconComponent name={iconName} size={25} color={tintColor} />);
            },
        }),
        initialRouteName: "Home",
        tabBarOptions: {
            activeTintColor: '#2B93B6',
            inactiveTintColor: '#403BEB'
        },
    }
);

const Routes = createAppContainer(
    createSwitchNavigator(
        {    
            Loading,
            Auth: authStack,
            App: appTab,
        },
        {
            initialRouteName: "Loading"
        }
    )
);

export default Routes;

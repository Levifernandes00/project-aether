import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";


import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterProfile from "./pages/RegisterProfile";
import RegisterStartup from "./pages/RegisterStartup";
import Explore from "./pages/Explore";
import Chat from "./pages/Chat";


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
        registerTab,
        Login,
    },
    {
        headerMode: 'none',
    }
);

const appTab = createBottomTabNavigator(
    {
        Explore,
        Home,
        Chat
    },
    {
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
            Auth: authStack,
            App: appTab,
        },
        {
            initialRouteName: "Auth"
        }
    )
);

export default Routes;

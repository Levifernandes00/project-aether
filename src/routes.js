import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Chat from "./pages/Chat";


const authStack = createStackNavigator(
    {
        Login,
        Register,
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
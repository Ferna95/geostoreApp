import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';

import Login from './AuthStack/Login';
import Register from './AuthStack/Register';

import {NegociosIndex} from './src/Negocios';
import {OfertasIndex} from './src/Ofertas';
import {ProductosIndex} from './src/Productos';
import {ExplorarIndex} from './src/Explorar';
import {HomeScreenIndex} from './src/Home';
import LogoutIndex from './src/Logout';
import Global from './src/common/Global';


const AppStack = createDrawerNavigator({
  Geostore:{ 
    screen: HomeScreenIndex,
  },
  Negocios: {
    screen: NegociosIndex,
  },
  Ofertas: {
    screen: OfertasIndex,
  },
  Productos: {
    screen: ProductosIndex,
  },
  Explorar: {
    screen: ExplorarIndex,
  },
  Logout:{
    screen: LogoutIndex,
  }
},
{
  intialRouteName: 'Geostore',
  drawerBackgroundColor: Global.COLORS.THREE,
  contentOptions: {
    activeTintColor: Global.COLORS.ONE,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});

const AuthStack = createStackNavigator({
  Login:{ 
    screen: Login,
  },
  Register: {
    screen: Register,
  }
},
{
  intialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
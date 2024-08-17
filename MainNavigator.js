
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import Dashboard1 from './screens/Dashboard1';
import Kyc1 from './screens/Kyc1';
import RegisterCons from './screens/RegisterCons';
import Loginvisitor from './screens/Loginvisitor';
import BikeCart from './screens/BikeCart';
import Payment from './screens/Payment';
import Register from './screens/Register';


const Stack = createNativeStackNavigator();

export default () => {


   return (
      <>

   <Stack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Landing" component={Landing} />
   <Stack.Screen name="bikecart" component={BikeCart} />
   <Stack.Screen name="RegisterCons" component={RegisterCons} />
   <Stack.Screen name="Register" component={Register} />
   <Stack.Screen name="Payment" component={Payment} />
   <Stack.Screen name="Dashboard1" component={Dashboard1} />
   <Stack.Screen name="Loginvisitor" component={Loginvisitor} />
   <Stack.Screen name="Kyc1" component={Kyc1} />

</Stack.Navigator>
  {/* )}  */}
 </>
);

}
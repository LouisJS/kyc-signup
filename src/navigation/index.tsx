import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EmailScreen from '~/screens/email';
import FirstnameScreen from '~/screens/firstname';
import LastnameScreen from '~/screens/lastname';
import PhoneScreen from '~/screens/phone';
import ResidenceScreen from '~/screens/residence';
import SummaryScreen from '~/screens/summary';

export type RootStackParamList = {
  Firstname: undefined;
  Lastname: undefined;
  Email: undefined;
  Phone: undefined;
  Residence: undefined;
  Summary: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Firstname"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Firstname" component={FirstnameScreen} />
        <Stack.Screen name="Lastname" component={LastnameScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Residence" component={ResidenceScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

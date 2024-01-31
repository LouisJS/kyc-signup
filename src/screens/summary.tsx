import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { RootStackParamList } from '../navigation';

import useSignUpStore from '~/state/signUpStore';

type SummaryScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Summary'>;

const SummaryScreen = () => {
  const navigation = useNavigation<SummaryScreenNavigationProps>();
  const signUpForm = useSignUpStore((state) => state.signUpForm);

  const shouldShowBackButton = (): boolean => {
    return navigation.canGoBack();
  };

  // Defines an array to loop on. Avoid repetition
  const userInfoFields = [
    { label: 'Prénom', value: signUpForm.firstName },
    { label: 'Nom', value: signUpForm.lastName },
    { label: 'Adresse email', value: signUpForm.email },
    { label: 'Numéro de téléphone', value: signUpForm.phone },
    { label: 'Adresse domicile', value: signUpForm.residence },
  ];

  return (
    <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
      <View className="bg-merino h-14 w-full py-3 items-center flex-row">
        {shouldShowBackButton() && (
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            labelVisible={false}
            tintColor="black"
          />
        )}
      </View>
      <Text className="font-raleway-extrabold text-3xl tracking-tighter text-primary-default mb-8">
        Informations{'\n'}
        <Text className="text-grey-800">personnelles</Text>
      </Text>
      {userInfoFields.map((field, index) => (
        <View key={index} className="bg-white rounded-lg py-3 px-4 mb-2 shadow-sm">
          <Text className="font-inter-medium text-grey-500 text-sm">{field.label}</Text>
          <Text className="font-inter-medium text-grey-800 text-base">{field.value}</Text>
        </View>
      ))}
    </LinearGradient>
  );
};

export default SummaryScreen;

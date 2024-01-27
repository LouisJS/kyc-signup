import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';

type EmailScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Email'>;

const EmailScreen = () => {
  const navigation = useNavigation<EmailScreenNavigationProps>();
  const [text, setText] = useState<string>('');

  return (
    <>
      <ProgressBar value={3 / 6} initialValue={2 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Quelle est votre <Text className="text-primary-default">adresse email</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <TextInput
            className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
            placeholder="Nom"
            placeholderTextColor="#7F8590"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
            returnKeyType="next"
          />
          <Button
            label="Continuer"
            onPress={() => navigation.navigate('Phone')}
            className="self-end mt-4"
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default EmailScreen;

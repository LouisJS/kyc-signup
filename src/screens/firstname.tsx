import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import * as z from 'zod';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';
import useSignUpStore from '~/state/signUpStore';

const schema = z
  .object({
    firstName: z.string().min(2, { message: 'Firstname must be at least 2 characters' }),
  })
  .required();

type FormData = {
  firstName: string;
};

type FirstnameScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Firstname'>;

const FirstnameScreen = () => {
  const navigation = useNavigation<FirstnameScreenNavigationProps>();
  const firstName = useSignUpStore((state) => state.signUpForm.firstName);
  const setValue = useSignUpStore((state) => state.setValue);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      firstName,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    setValue('firstName', data.firstName);
    navigation.navigate('Lastname');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={{ flex: 1 }}>
      <ProgressBar value={1 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Pour commencer, quel est votre <Text className="text-primary-default">prénom</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
                placeholder="Prénom"
                placeholderTextColor="#7F8590"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                defaultValue={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text className="font-inter-medium text-sm text-primary-default mt-1">
              {errors.firstName.message}
            </Text>
          )}
          <Button
            label="Continuer"
            onPress={handleSubmit(onSubmit)}
            className="self-end mt-4"
            disabled={!isValid}
          />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default FirstnameScreen;

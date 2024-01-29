import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import * as z from 'zod';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';
import useSignUpStore from '~/state/signUpStore';

const schema = z
  .object({
    email: z.string().email({ message: 'Email invalid, it should look like : azerty@mail.com' }),
  })
  .required();

type FormData = {
  email: string;
};

type EmailScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Email'>;

const EmailScreen = () => {
  const navigation = useNavigation<EmailScreenNavigationProps>();
  const email = useSignUpStore((state) => state.signUpForm.email);
  const setValue = useSignUpStore((state) => state.setValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    setValue('email', data.email);
    navigation.navigate('Phone');
  };

  return (
    <>
      <ProgressBar value={3 / 6} initialValue={2 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Quelle est votre <Text className="text-primary-default">adresse email</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
                placeholder="Email"
                placeholderTextColor="#7F8590"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                inputMode="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="font-inter-medium text-sm text-primary-default mt-1">
              {errors.email.message}
            </Text>
          )}
          <Button label="Continuer" onPress={handleSubmit(onSubmit)} className="self-end mt-4" />
        </View>
      </LinearGradient>
    </>
  );
};

export default EmailScreen;

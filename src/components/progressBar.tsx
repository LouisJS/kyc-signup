import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Bar } from 'react-native-progress';

type BarProps = {
  initialValue?: number;
  value: number;
};

const barWidth = 231;

const ProgressBar = ({ initialValue = 0, value }: BarProps) => {
  const navigation = useNavigation();
  const [barValue, setBarValue] = useState(initialValue);
  const [animated, setAnimated] = useState(false);

  const shouldShowBackButton = (): boolean => {
    return navigation.canGoBack();
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 300);
    setTimeout(() => {
      setBarValue(value);
    }, 600);
  }, [value]);

  return (
    <View className="bg-merino h-14 w-full py-3 px-6 items-center justify-center flex-row">
      {shouldShowBackButton() && (
        <HeaderBackButton
          style={{ position: 'absolute', left: 16 }}
          onPress={() => navigation.goBack()}
          labelVisible={false}
          tintColor="black"
        />
      )}
      <Bar
        animated={animated}
        useNativeDriver
        progress={barValue}
        borderRadius={8}
        width={barWidth}
        height={4}
        color="#4D50F4"
        unfilledColor="#CACBFC"
        borderWidth={0}
      />
    </View>
  );
};

export default ProgressBar;

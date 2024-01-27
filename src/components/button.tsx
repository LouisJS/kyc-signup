import clsx from 'clsx';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleProp } from 'react-native';

// Extends the TouchableOpacityProps
type CustomButtonProps = TouchableOpacityProps & {
  label: string;
  textClassName?: string;
  style?: StyleProp<TouchableOpacity>;
};

const Button = ({
  label,
  style = null,
  textClassName = '',
  disabled = false,
  ...touchableOpacityProps
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'w-[140px] rounded-lg h-[53px] bg-primary-default items-center justify-center',
        disabled && 'bg-grey-150'
      )}
      style={style}
      {...touchableOpacityProps}>
      <Text
        className={clsx(
          'text-white font-inter-bold text-base tracking-tighter',
          disabled && 'text-primary-lighter',
          textClassName
        )}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

import type { TBaseIconName } from '../base-icon/types';

export type TBaseInputProps = {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string | null;
  leftIcon?: TBaseIconName;
  rightIcon?: TBaseIconName;
};

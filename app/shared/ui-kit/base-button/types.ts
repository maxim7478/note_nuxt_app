import {type EBaseButtonMode, type EBaseButtonSize, EBaseButtonTheme} from './enums';
import type {TBaseIconName} from "~/shared/ui-kit/base-icon/types.ts";

export type TBaseButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  mode?: EBaseButtonMode;
  theme?: EBaseButtonTheme;
  size?: EBaseButtonSize;
  rounded?: boolean;
  text?: string;
  disabled?: boolean;
  leftIcon?: TBaseIconName;
  rightIcon?: TBaseIconName;
}

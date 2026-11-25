import type { TBaseIconName } from '../base-icon/types';
import type { EBaseBadgeMode } from './enums';

export type TBaseBadgeProps = {
  mode?: EBaseBadgeMode;
  icon?: TBaseIconName;
  label?: string;
};

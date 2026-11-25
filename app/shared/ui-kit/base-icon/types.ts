import type { EBaseIconSize } from './enums';

export type TBaseIconName = keyof typeof import('@mdi/js');

export type TBaseIcon = {
  name: TBaseIconName;
  size?: EBaseIconSize;
}

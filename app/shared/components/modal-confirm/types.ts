import type {EBaseButtonMode, EBaseButtonSize, EBaseButtonTheme} from "~/shared";

export type TBaseModalConfirmProps = {
  title: string;
  text?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmTheme?: EBaseButtonTheme;
  confirmMode?: EBaseButtonMode;
  confirmSize?: EBaseButtonSize;
  cancelTheme?: EBaseButtonTheme;
  cancelMode?: EBaseButtonMode;
  cancelSize?: EBaseButtonSize;
}
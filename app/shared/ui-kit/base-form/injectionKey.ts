import type { InjectionKey } from 'vue';
import type { FormApi } from './types';

export const FormApiKey: InjectionKey<FormApi> = Symbol('formApi');

import type { Component } from 'vue';

export interface IModalProps {
  id: string;
  config?: IModalProps;
  props?: Record<string, unknown>;
  handlers?: Record<string, (args?: unknown) => unknown | void>;
  component: Component;
}

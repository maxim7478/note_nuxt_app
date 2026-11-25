import type { RouteLocationRaw } from 'vue-router';

export type TBaseBreadcrumbItem = {
  label: string;
  to?: RouteLocationRaw;
  disabled?: boolean;
};

export type TBaseBreadcrumbsProps = {
  items: readonly TBaseBreadcrumbItem[];
};

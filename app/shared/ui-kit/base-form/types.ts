import type { ZodObject } from 'zod';

export interface FormApi {
  validate: () => Promise<boolean>;
  getError: (field: string) => unknown;
  getGeneralError: () => string | null;
  isValidField: (field: string) => boolean;
  validateField: (field: string) => Promise<void>;
  setServerError: (field: string, message: string) => void;
  setGeneralError: (message: string) => void;
  clearError: (field: string) => void;
  clearGeneralError: () => void;
  clearAllErrors: () => void;
}

export interface FormProps {
  schema: ZodObject;
  model: Record<string, unknown>;
  idForm: string;
}

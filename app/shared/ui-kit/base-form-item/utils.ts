export const extractString = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (value !== null && typeof value === 'object') {
    for (const item of Object.values(value)) {
      const result = extractString(item);
      if (result !== '') {
        return result;
      }
    }
  }

  return '';
};

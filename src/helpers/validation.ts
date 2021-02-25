export const validateEmail = (email: string): boolean => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return false;
  }
  return true;
};

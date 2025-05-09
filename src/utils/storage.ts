export const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  export const getLocalStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  
  export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
  };
  
  export const clearLocalStorage = () => {
    localStorage.clear();
  };
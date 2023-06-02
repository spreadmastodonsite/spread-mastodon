import { create } from 'zustand';

const getInitialUserData = () => {
  if (typeof window !== 'undefined') {
    // Retrieve the stored data from local storage
    const storedData = window.localStorage.getItem('userData');

    // If stored data exists, parse and return it; otherwise, return the initial data
    return storedData
      ? JSON.parse(storedData)
      : {
          username: 'John Doe',
          age: 25,
          email: 'johndoe@example.com',
        };
  } else {
    // Fallback for non-browser environment (e.g., server-side rendering)
    return {
      username: 'John Doe',
      age: 25,
      email: 'johndoe@example.com',
    };
  }
};

export const useStore = create((set) => ({
  userData: getInitialUserData(),
  setUserData: (data) => {
    set(() => ({ userData: data }));

    if (typeof window !== 'undefined') {
      // Store the updated data in local storage
      window.localStorage.setItem('userData', JSON.stringify(data));
    }
  },
}));

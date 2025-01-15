import { useEffect, useCallback } from 'react';
import { debounce } from '../pages/users/admin/utils/debounce';
import axios from 'axios';

const useAutoSave = (data, url, delay = 1000) => {
  const saveData = useCallback(
    debounce(async (data) => {
      try {
        await axios.post(url, data);
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }, delay),
    [url, delay]
  );

  useEffect(() => {
    if (data) {
      saveData(data);
    }
  }, [data, saveData]);
};

export default useAutoSave;
import { useState, useEffect } from 'react';

export function useUrgencyCounter() {
  const [count, setCount] = useState<number>(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev <= 2) {
          clearInterval(intervalId);
          return 2;
        }
        return prev - 1;
      });
    }, 30000); // Reduce every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return count;
}

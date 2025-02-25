import {useEffect} from 'react';

export const useResponseHandler = ({
  error,
  success,
  reset,
}: {
  success: {value: boolean; trigger: () => void};
  error: {value: boolean; trigger: () => void};
  reset?: () => void;
}) => {
  useEffect(() => {
    if (success?.value) {
      success?.trigger();
    }
    if (error?.value) {
      error?.trigger();
    }

    return () => {
      reset && reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success?.value, error?.value]);

  return null;
};

import { useQuery } from '@apollo/react-hooks';

import { useSystemNotifications } from '@eventespresso/services';
import { GET_CURRENT_USER } from '.';
import { FetchQueryResult } from '../types';
import { Viewer } from '@eventespresso/services';

const useFetchCurrentUser = (): FetchQueryResult<Viewer> => {
  const toaster = useSystemNotifications();

  const { data, error, loading } = useQuery<Viewer>(GET_CURRENT_USER, {
    // only display error, not loading or success
    onError: (error): void => {
      toaster.error({ message: error.message });
    },
  });

  return {
    data,
    error,
    loading,
  };
};

export default useFetchCurrentUser;

import { GET_CURRENT_USER } from '.';
import { useCacheQuery, ReadQueryOptions } from '../';
import type { CurrentUserProps, Viewer } from '@eventespresso/services';

/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): CurrentUserProps => {
  const options: ReadQueryOptions = {
    query: GET_CURRENT_USER,
  };
  const { data } = useCacheQuery<Viewer>(options);

  return data?.viewer;
};

export default useCurrentUser;

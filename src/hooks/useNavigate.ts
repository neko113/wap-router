import { useCallback, useContext } from 'react';
import { RouterContext } from '../context';

const useNavigate = () => {
  const { path, changePath } = useContext(RouterContext);

  const navigate = useCallback(
    (nextPath: string) => {
      if (path.pathname === nextPath) return;

      changePath(nextPath);
    },
    [path, changePath],
  );

  return navigate;
};

export default useNavigate;

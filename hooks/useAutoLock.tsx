import { lock } from '@/store/slices/lockSlice';
import { RootState } from '@/store/store';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function useAutoLock(timeoutMs = 10000){
  const dispatch = useDispatch();
  const timer = useRef<any>(null);
  const isLocked = useSelector((s: RootState) => s.lock.isLocked);
  useEffect(()=> {
    const reset = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(()=> dispatch(lock()), timeoutMs);
    };
    reset();

    const onAppState = (s: AppStateStatus) => {
      if (s !== 'active') {
        dispatch(lock());
      } else {
        reset();
      }
    };

    const sub = AppState.addEventListener('change', onAppState);
    return () => {
      sub.remove();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isLocked]);
}

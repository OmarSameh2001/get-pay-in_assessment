import { QueryClient } from '@tanstack/react-query';
import {
  PersistedClient,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'react-query-cache',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});

const mmkvPersister = {
  persistClient: async (client: PersistedClient) => {
    try {
      storage.set('react-query-cache', JSON.stringify(client));
    } catch (err) {
      console.error('Error saving cache:', err);
    }
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    try {
      const cache = storage.getString('react-query-cache');
      return cache ? JSON.parse(cache) : undefined;
    } catch (err) {
      console.error('Error restoring cache:', err);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      storage.delete('react-query-cache');
    } catch (err) {
      console.error('Error removing cache:', err);
    }
  },
};

persistQueryClient({
  queryClient,
  persister: mmkvPersister,
});

export const persister = mmkvPersister;

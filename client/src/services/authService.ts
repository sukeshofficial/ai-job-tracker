import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './api';
import { useAuthStore } from '../store/useAuthStore';

export const useSignup = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/auth/signup', data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/auth/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

export const useMe = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      setLoading(true);
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
        return res.data;
      } catch (err) {
        setUser(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    retry: false,
  });
};

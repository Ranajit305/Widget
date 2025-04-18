import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,

    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await axiosUrl.get('/user/check');
            if (res.data.success) {
                set({ user: res.data.user })
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    signup: async (username, password) => {
        try {
            const res = await axiosUrl.post('/user/signup', { username, password });
            if (res.data.success) {
                toast.success(res.data.message);
                set({ user: res.data.user });
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        }
    },

    login: async (username, password) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post('/user/login', { username, password });
            if (res.data.success) {
                set({ user: res.data.user });
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosUrl.post('/user/logout');
            if (res.data.success) {
                set({ user: null })
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}))
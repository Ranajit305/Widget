import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'

export const useCompanyStore = create((set, get) => ({
    companies: [],
    loading: false,

    getCompanies: async () => {
        try {
            const res = await axiosUrl.get('/company/accounts');
            if (res.data.success) {
                set({ companies: res.data.companies });
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    updateStatus: async (companyId, status) => {
        try {
            const res = await axiosUrl.post(`/company/accounts/${companyId}`, { status });
            if (res.data.success) {
                console.log('Status Updated');
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}))
import { create } from 'zustand';
import axios from 'axios';

const useCountryStatsStore = create((set) => ({
    countryStats: null,
    loading: false,
    error: null,
    
    fetchCountryStats: async () => {
        set({ loading: true });
        try {
            const response = await axios.get('http://localhost:5050/api/country-stats');
            console.log('Fetched country stats:', response.data);
            set({ 
                countryStats: response.data.data,
                loading: false,
                error: null 
            });
        } catch (error) {
            console.error('Error fetching country stats:', error);
            set({ 
                error: 'Failed to fetch country statistics',
                loading: false 
            });
        }
    }
}));

export default useCountryStatsStore; 
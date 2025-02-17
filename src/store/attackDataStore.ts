import { create } from 'zustand';

interface ProcessedCountryData {
  countryName: string;
  threatLevel: string;
  activeThreats: number;
  blockedAttacks: number;
  avgConfidence: number;
  topAttackTypes: { type: string; count: number }[];
  recentAttacks: {
    type: string;
    protocol: string;
    confidence: number;
    timestamp: string;
  }[];
}

interface AttackDataStore {
  rawData: any;
  processedData: { [countryCode: string]: ProcessedCountryData };
  setRawData: (data: any) => void;
  getCountryData: (countryCode: string) => ProcessedCountryData | null;
  processCountryData: (countryCode: string) => void;
}

const useAttackDataStore = create<AttackDataStore>((set, get) => ({
  rawData: null,
  processedData: {},

  setRawData: (data) => {
    set({ rawData: data });
    // Store in localStorage
    localStorage.setItem('attackData', JSON.stringify(data));
  },

  getCountryData: (countryCode) => {
    const state = get();
    if (!state.processedData[countryCode]) {
      state.processCountryData(countryCode);
    }
    return state.processedData[countryCode] || null;
  },

  processCountryData: (countryCode) => {
    
    const state = get();
    const countryData = state.rawData?.[countryCode];
    
    if (!countryData) return;

    const processedData = {
      countryName: countryData.countryName,
      threatLevel: countryData.threatLevel,
      activeThreats: countryData.metrics.activeThreats,
      blockedAttacks: countryData.metrics.blockedAttacks,
      avgConfidence: countryData.metrics.avgConfidence,
      topAttackTypes: Object.entries(countryData.attackTypes)
        .map(([type, count]) => ({ type, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3),
      recentAttacks: countryData.recentAttacks
        .slice(0, 5)
        .map(attack => ({
          type: attack.type,
          protocol: attack.protocol,
          confidence: attack.confidence,
          timestamp: attack.timestamp
        }))
    };

    set(state => ({
      processedData: {
        ...state.processedData,
        [countryCode]: processedData
      }
    }));
  }
}));

export default useAttackDataStore; 
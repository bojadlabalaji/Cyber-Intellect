import fs from 'fs';
import path from 'path';

export const updateTooltipData = async (countryStatsData) => {
  const tooltipData = {};

  // Transform country stats data into tooltip format
  Object.entries(countryStatsData).forEach(([countryCode, data]) => {
    tooltipData[data.countryName] = {
      attacks: data.totalReports,
      recentAttacks: data.recentAttacks.map(attack => 
        `${attack.type} from ${attack.ip} (${attack.impact} impact)`
      ).slice(0, 5) // Keep only the 5 most recent attacks
    };
  });

  // Write to tooltip-data.jsx
  const tooltipContent = `
export const countryData = ${JSON.stringify(tooltipData, null, 2)};
  `.trim();

  try {
    const filePath = path.resolve(__dirname, '../data/tooltip-data.jsx');
    await fs.promises.writeFile(filePath, tooltipContent);
  } catch (error) {
    console.error('Error updating tooltip data:', error);
  }
}; 
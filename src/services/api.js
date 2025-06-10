const API_BASE_URL = 'https://wodyapi.nowaccy.cloud/api/hydrodata';

const api = {
  // Get all stations
  getStations: async () => {
    const response = await fetch(`${API_BASE_URL}/stations`);
    if (!response.ok) throw new Error('Failed to fetch stations');
    return response.json();
  },

  // Get single station details
  getStation: async (id) => {
    const response = await fetch(`${API_BASE_URL}/stations/${id}`);
    if (!response.ok) throw new Error('Failed to fetch station details');
    return response.json();
  },

  // Get station chart data
  getStationChart: async (id, startDate = '2023-10-01', endDate = '2026-10-10') => {
    const response = await fetch(
      `${API_BASE_URL}/stations/${id}/chart?startDate=${startDate}&endDate=${endDate}`
    );
    if (!response.ok) throw new Error('Failed to fetch station chart data');
    return response.json();
  }
};

export default api; 
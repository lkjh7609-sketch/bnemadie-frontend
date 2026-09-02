const API_BASE = import.meta.env.VITE_API_URL || 'https://puny-foxes-drive.loca.lt/api';
let currentApiKey = null;


export const setApiKey = (key) => {
  currentApiKey = key;
};

export const fetchAPI = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(currentApiKey && { 'x-api-key': currentApiKey }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'API Request Failed');
  return data;
};

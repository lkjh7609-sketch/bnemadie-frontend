const API_BASE = import.meta.env.VITE_API_URL || 'https://amail-c6ud.onrender.com/api';

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

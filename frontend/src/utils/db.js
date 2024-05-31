const API_URL = 'http://localhost:5000/api/arts';

export const getAllArts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addArt = async (art) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: art
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

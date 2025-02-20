const API_BASE_URL = 'http://localhost:8080';

export const solvePuzzle = async (grid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grid }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error solving puzzle:', error);
    throw error;
  }
}; 
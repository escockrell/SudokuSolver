const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const solvePuzzle = async (puzzle) => {
  try {
    const response = await fetch(`${API_URL}/api/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ puzzle }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to solve puzzle');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error solving puzzle:', error);
    throw error;
  }
}; 
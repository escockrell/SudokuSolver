const API_BASE_URL = 'http://localhost:8080';

export const solvePuzzle = async (puzzleInput) => {
  try {
    const response = await fetch(`${API_BASE_URL}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ puzzle: puzzleInput }),
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
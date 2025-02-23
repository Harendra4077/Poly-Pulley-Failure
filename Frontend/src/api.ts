// src/api.ts
const API_BASE_URL = 'http://localhost:5000/api'; // Update this if your backend URL changes

// Fetch all pulleys
export const getPulleys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pulleys`);
    if (!response.ok) {
      throw new Error('Failed to fetch pulleys');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pulleys:', error);
    throw error;
  }
};

// Create a new pulley
interface PulleyData {
  // Define the properties of PulleyData here
  name: string;
  diameter: number;
  material: string;
}

export const createPulley = async (pulleyData: PulleyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pulleys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pulleyData),
    });
    if (!response.ok) {
      throw new Error('Failed to create pulley');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating pulley:', error);
    throw error;
  }
};
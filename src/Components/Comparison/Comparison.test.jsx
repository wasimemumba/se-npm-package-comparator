import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Comparison from './Comparison';
import { CalculateWinner } from '../../utils/ComparisonUtils';

jest.mock('axios');
jest.mock('../../utils/ComparisonUtils');

const mockData = [
  {
    collected: {
      metadata: {
        name: 'Package 1',
        description: 'Description of Package 1',
        links: {
          repository: 'https://github.com/user/repo1',
          homepage: 'https://homepage1.com'
        }
      },
      npm: {
        starsCount: 5
      }
    },
    evaluation: {
      popularity: {
        downloadsCount: 100
      },
      quality: {
        health: 0.8
      }
    }
  },
  {
    collected: {
      metadata: {
        name: 'Package 2',
        description: 'Description of Package 2',
        links: {
          repository: 'https://github.com/user/repo1',
          homepage: 'https://homepage1.com'
        }
      },
      npm: {
        starsCount: 10
      }
    },
    evaluation: {
      popularity: {
        downloadsCount: 200
      },
      quality: {
        health: 0.6
      }
    }
  }
];

describe('Comparison Component', () => {
  it('renders correctly with initial data', () => {
    CalculateWinner.mockReturnValue({ result: 'Package 1 is better', index: 0 });
    const { getByText } = render(<Comparison data={mockData} />);
    expect(getByText('Package 1 is better')).toBeInTheDocument();
  });

  it('fetches and displays languages correctly', async () => {
    axios.get.mockResolvedValue({ data: { JavaScript: 100, Python: 50 } });
    render(<Comparison data={mockData} />);
    
    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    console.error = jest.fn(); 

    render(<Comparison data={mockData} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.anything());
    });
    
  });
});
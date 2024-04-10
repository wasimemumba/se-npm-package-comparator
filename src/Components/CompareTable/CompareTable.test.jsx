import React from 'react';
import { queryByTestId, render, screen } from '@testing-library/react';
import CompareTable from './CompareTable';


const mockData = [
    {
      collected: {
        metadata: {
          name: 'package1',
          version: '1.0.0',
          description: 'Description of package1',
          keywords: ['keyword1', 'keyword2'],
          links: {
            homepage: 'https://package1homepage.com',
            repository: 'https://package1repository.com',
            bugs: 'https://package1bugs.com',
          },
          license: 'MIT',
          date: '2022-01-01',
          publisher: {
            email: 'publisher@example.com',
          },
          maintainers: [
            {
              email: 'maintainer@example.com',
            },
          ],
        },
      },
    },
    {
      collected: {
        metadata: {
          name: 'package2',
          version: '2.0.0',
          description: 'Description of package2',
          keywords: ['keyword3', 'keyword4'],
          links: {
            homepage: 'https://package2homepage.com',
            repository: 'https://package2repository.com',
            bugs: 'https://package2bugs.com',
          },
          license: 'Apache-2.0',
          date: '2022-02-01',
          publisher: {
            email: 'publisher@example.com',
          },
          maintainers: [
            {
              email: 'maintainer@example.com',
            },
          ],
        },
      },
    },
  ];
  

  

describe('CompareTable', () => {
    it('renders correctly', () => {
    const {getByTestId} =  render(<CompareTable loading={false} data={mockData} />);
        expect(getByTestId("Table")).toBeInTheDocument();
        expect(screen.getByText("package1")).toBeInTheDocument();
        // expect(screen.getByText("Loading...")).not.toBeInTheDocument();
    });



    it('renders loading state', () => {
        render(<CompareTable loading={true} data={mockData} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});





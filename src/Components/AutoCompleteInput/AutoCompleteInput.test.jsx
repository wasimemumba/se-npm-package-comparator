import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AutoCompleteInput2 from './AutoCompleteInput';
import  SelectedPackagesProvider  from '../../Context/SelectedPacakgesContext';
import toast from 'react-hot-toast';

// Mock axios and react-hot-toast globally at the top of your test file
jest.mock('axios');
jest.mock('react-hot-toast');

const itemValue = jest.fn()

describe('AutoCompleteInput2', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    toast.error = jest.fn();
  });





  it('renders correctly', async () => {
  
    act(() => {
        render(
            <SelectedPackagesProvider.Provider value={{itemValue}}>
              <AutoCompleteInput2 setShowTable={() => {}} />
            </SelectedPackagesProvider.Provider>
          )
        })
 

    expect( await screen.findByRole('combobox')).toBeInTheDocument();
    expect( await screen.findByRole('button', { name: 'Compare' })).toBeInTheDocument();
  });

  it('debounces search when typing in the select input', async () => {
    const mockResponse = { results: [{ package: { name: 'react' } }, { package: { name: 'vue' } }] };
    axios.get.mockResolvedValue({ data: mockResponse });
  
    act(() => {
      render(
          <SelectedPackagesProvider.Provider value={{itemValue}}>
            <AutoCompleteInput2 setShowTable={() => {}} />
          </SelectedPackagesProvider.Provider>
        )
      })


    const input = await screen.findByRole('combobox');
    await act(async () => {
      userEvent.type(input, 'react');
    });
   
      await waitFor(() => expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("react")), { timeout: 1000 });
    
  });

  it('displays error toast when API call fails', async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));
    
    act(() => {
      render(
          <SelectedPackagesProvider.Provider value={{itemValue}}>
            <AutoCompleteInput2 setShowTable={() => {}} />
          </SelectedPackagesProvider.Provider>
        )
      })
    

    const input = await screen.findByRole('combobox');
    await act(async () => {
      userEvent.type(input, 'error');
    });
    
      await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Network Error"));
 
  });
  
});
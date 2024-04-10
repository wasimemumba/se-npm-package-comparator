import { CalculateWinner, getUsernameAndRepo, convertToApiUrl } from './ComparisonUtils'; 

describe('CalculateWinner', () => {
  it('returns correct comparison result', () => {
    const package1 = {
      evaluation: {
        popularity: { communityInterest: 10, downloadsCount: 100 },
        quality: { carefulness: 8, tests: 9 }
      },
      collected: { metadata: { name: 'Package1' } }
    };

    const package2 = {
      evaluation: {
        popularity: { communityInterest: 15, downloadsCount: 200 },
        quality: { carefulness: 9, tests: 9 }
      },
      collected: { metadata: { name: 'Package2' } }
    };

    const result = CalculateWinner(package1, package2);

   
    expect(result.index).toEqual(1); 
  });
});

describe('getUsernameAndRepo', () => {
  it('returns correct username and repository name', () => {
    const url = 'https://github.com/username/repo';

    const result = getUsernameAndRepo(url);

    expect(result.username).toEqual('username');
    expect(result.repo).toEqual('repo');
  });

  it('throws error for invalid GitHub URL', () => {
    const invalidUrl = 'https://example.com';

    expect(() => {
      getUsernameAndRepo(invalidUrl);
    }).toThrow('Invalid GitHub URL');
  });
});

describe('convertToApiUrl', () => {
  it('returns correct API URL', () => {
    const url = 'https://github.com/username/repo';

    const result = convertToApiUrl(url);

    expect(result).toEqual('https://api.github.com/repos/username/repo');
  });
});

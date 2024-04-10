
type CalculateWinnerType = (Package1: any, Package2: any) => { result: string; index: number };

export const CalculateWinner : CalculateWinnerType  = (Package1 , Package2)   => {
   
    const Package1Score =
      Package1.evaluation.popularity.communityInterest * 0.2 +
      Package1.evaluation.popularity.downloadsCount * 0.5 +
      (Package1.evaluation.quality.carefulness +
        Package1.evaluation.quality.tests) *
        0.3;

    const Package2Score =
      Package2.evaluation.popularity.communityInterest * 0.2 +
      Package2.evaluation.popularity.downloadsCount * 0.5 +
      (Package2.evaluation.quality.carefulness +
        Package2.evaluation.quality.tests) *
        0.3;

    if (Package1Score === Package2Score) {
      
      return {  result : "Both packages are equal." ,
                index : -1,
            } 
         }
    else if (Package1Score < Package2Score) {
      
      return {
            result : `${Package2.collected.metadata.name} is ${(
                Package2Score / Package1Score
            ).toFixed(2)} times better.`,
            index : 1
      }
    } else {
      
      return {
        result :`${Package2.collected.metadata.name} is ${(
            Package2Score / Package1Score
          ).toFixed(2)} times better.`,
        index : 0
      }
    }
  };


  type getUsernameAndRepoType = (url: string) => { username: string; repo: string };

  export  const  getUsernameAndRepo :  getUsernameAndRepoType = (url: string)=>  {
    const parts = url.split("/");
    if (
      parts.length < 4 ||
      parts[0] !== "https:" ||
      parts[2] !== "github.com"
    ) {
      throw new Error("Invalid GitHub URL");
    }
    const username = parts[3];
    const repo = parts[4];
    return { username, repo };
  }

 export  function convertToApiUrl(url: string): string {
    const { username, repo } = getUsernameAndRepo(url);
    return `https://api.github.com/repos/${username}/${repo}`;
  }
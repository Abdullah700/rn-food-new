import { useEffect, useState } from 'react';

import yelp from '../api/yelp';
import { IBusiness, IBusinessRes } from '../types/IBusiness';
import { IResultsHook } from '../types/IResultsHook';

const useResults: IResultsHook = () => {
  const [results, setResults] = useState<IBusiness[]>([]);
  const [errMsg, setErrMsg] = useState<string>("");

  const searchApi = async (term: string): Promise<void> => {
    try {
      const response = await yelp.get<IBusinessRes>("/search", {
        params: {
          limit: 50,
          term,
          location: "san jose",
        },
      });
      console.log(response.data.businesses);
      setResults(response.data.businesses);
    } catch (err) {
      setErrMsg("Something went wrong");
    }
  };

  useEffect(() => {
    searchApi("");
  }, []);

  return [{ searchApi, results, errMsg }];
};

export { useResults };

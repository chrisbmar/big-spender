import { Billionaire } from "../types/types";

export const fetchData = async (): Promise<Billionaire> => {
  try {
    const response = await fetch(
      "https://forbes400.herokuapp.com/api/forbes400?limit=10"
    );
    const data = await response.json();
    const billionaires = data.map(
      (billionaire: {
        person: { name: string; squareImage: string };
        finalWorth: number;
        bios: string[];
        source: string;
      }) => {
        return {
          name: billionaire.person.name,
          totalMoney: Math.round(billionaire.finalWorth * 1000000),
          introduction: billionaire.bios[0],
          imageSrc: `https:${billionaire.person.squareImage}`,
          wealthSource: billionaire.source,
        };
      }
    );
    return billionaires;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};

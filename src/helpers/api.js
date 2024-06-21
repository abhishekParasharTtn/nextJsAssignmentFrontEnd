import config from "@/config";

export const api = {
  get: async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `/graphql?query=${encodedQuery}`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //cache: "force-cache",
        //cache: "no-store",
        next: { revalidate: 20 },
      };
      const response = await fetch(`${config.api}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `/graphql`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      };
      const response = await fetch(`${config.api}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

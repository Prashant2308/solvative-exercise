import { useQuery } from '@tanstack/react-query';

type Payload = {
  pageNumber: number;
  pageSize: number;
  name?: string; 
}
const API_KEY = import.meta.env.VITE_RAPID_KEY;
export const defPayloadValues = {
  pageNumber: 1,
  pageSize: 10,
  name: '', 
}
export const useCities = (payload: Payload = defPayloadValues) => {
  return useQuery({
    queryKey: ['cities', payload.pageNumber, payload.pageSize, payload.name],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        limit: payload.pageSize.toString(),
        offset: ((payload.pageNumber - 1) * payload.pageSize).toString(), // Calculate offset based on page number and size
        namePrefix: payload?.name || '',
      }).toString();

      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?${queryParams}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }

      return response.json();
    },
  });
};
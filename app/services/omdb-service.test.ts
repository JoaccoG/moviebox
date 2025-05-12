import { vi, describe, it, expect } from 'vitest';
import { getMovies, getMovieDetails } from './omdb-service';

describe('Given a getMovies service', () => {
  describe('When called successfully', () => {
    it('Then it should return movie results', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          Search: [
            { Title: 'Test 1', imdbID: '123456' },
            { Title: 'Test 2', imdbID: '654321' }
          ],
          totalResults: '20'
        })
      } as Response);

      const result = await getMovies({ title: 'Test 1' });

      expect(result.status).toBe(200);
      expect(result.data?.movies).toHaveLength(2);
      expect(result.data?.movies[0].Title).toBe('Test 1');
    });
  });

  describe('When called with a query parameter', () => {
    it('Then it should handle the request correctly', async () => {
      const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Search: [], totalResults: '0' })
      } as Response);

      await getMovies({ title: 'Test 1', query: 'type=movie' });
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('&type=movie'));

      await getMovies({ title: 'Test 2' });
      expect(mockFetch).toHaveBeenCalledWith(expect.not.stringContaining('&type=movie'));
    });
  });

  describe('When the API fails', () => {
    it('Then it should handle the errors', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false, statusText: 'Internal Server Error' } as Response);

      const result = await getMovies({ title: 'error' });

      expect(result.status).toBe(500);
      expect(result.error).toBe('Error fetching movies: Internal Server Error');
    });
  });

  describe('When the title is missing', () => {
    it('Then it should throw an error', async () => {
      await expect(getMovies({ title: '' })).resolves.toEqual({
        status: 500,
        error: 'Missing required "title" parameter',
        data: undefined
      });
    });
  });
});

describe('Given a getMovieDetails service', () => {
  describe('When called successfully', () => {
    it('Then it should return the movie details', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Title: 'Test 2', imdbID: '654321', Plot: 'A mind-bending thriller.' })
      } as Response);

      const result = await getMovieDetails({ id: '654321' });

      expect(result.status).toBe(200);
      expect(result.data?.Title).toBe('Test 2');
    });
  });

  describe('When called with a query parameter', () => {
    it('Then it should handle the request correctly', async () => {
      const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Search: [], totalResults: '0' })
      } as Response);

      await getMovieDetails({ id: '123456', query: 'type=movie' });
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('&type=movie'));

      await getMovieDetails({ id: '654321' });
      expect(mockFetch).toHaveBeenCalledWith(expect.not.stringContaining('&type=movie'));
    });
  });

  describe('When the API fails', () => {
    it('Then it should handle the errors', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false, statusText: 'Movie not found' } as Response);

      const result = await getMovieDetails({ id: 'error' });

      expect(result.status).toBe(500);
      expect(result.error).toBe('Error fetching movie details: Movie not found');
    });
  });

  describe('When the id is missing', () => {
    it('Then it should throw an error', async () => {
      await expect(getMovieDetails({ id: '' })).resolves.toEqual({
        status: 500,
        error: 'Missing required "id" parameter',
        data: undefined
      });
    });
  });
});

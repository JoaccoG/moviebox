import { meta } from './';

describe('Given a meta function', () => {
  describe('When it is called', () => {
    test('Then it should return an array with two objects', () => {
      const result = meta({});
      expect(result).toHaveLength(2);
      expect(result[0].title).toEqual(expect.stringContaining('MovieBox'));
      expect(result[1]).toEqual({ name: 'description', content: expect.stringContaining('MovieBox') });
    });
  });
});

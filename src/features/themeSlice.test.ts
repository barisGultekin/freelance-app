import themeReducer, { toggleTheme } from './themeSlice';

describe('themeSlice', () => {
  const initialState = {
    theme: 'light',
  };

  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleTheme', () => {
    const actual = themeReducer(initialState, toggleTheme());
    expect(actual.theme).toEqual('dark');
  });

  it('should persist theme to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    themeReducer(initialState, toggleTheme());
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  });
});
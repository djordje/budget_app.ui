import { getApiToken } from './apiTokenSelector';

describe('apiTokenSelector', () => {
  it('takes apiToken from state', () => {
    const state = {
      apiToken: { accessToken: 'access-token-1' }
    };
    expect(getApiToken(state)).toEqual(state.apiToken);
  });
});

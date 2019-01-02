import connection from '../requestConnection';

export function getPaginatedCurrencies(accessToken, page = 1, perPage = 10) {
  return connection.get('/v1/currencies', {
    params: {
      page_number: page,
      page_size: perPage
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function createCurrency(accessToken, data) {
  return connection.post('/v1/currencies', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function updateCurrency(accessToken, id, data) {
  return connection.put(`/v1/currencies/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function deleteCurrency(accessToken, id) {
  return connection.delete(`/v1/currencies/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
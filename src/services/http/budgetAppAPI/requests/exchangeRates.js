import connection from '../requestConnection';

export function createExchangeRate(accessToken, data) {
  return connection.post('/v1/exchange_rates', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function updateExchangeRate(accessToken, id, data) {
  return connection.put(`/v1/exchange_rates/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function deleteExchangeRate(accessToken, id) {
  return connection.delete(`/v1/exchange_rates/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
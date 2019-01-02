import connection from '../requestConnection';

export function getPaginatedIncomes(accessToken, page = 1, perPage = 10) {
  return connection.get('/v1/incomes', {
    params: {
      page_number: page,
      page_size: perPage
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function createIncome(accessToken, data) {
  return connection.post('/v1/incomes', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function updateIncome(accessToken, id, data) {
  return connection.put(`/v1/incomes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function deleteIncome(accessToken, id) {
  return connection.delete(`/v1/incomes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
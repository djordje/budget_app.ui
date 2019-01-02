import connection from '../requestConnection';

export function getPaginatedExpenses(accessToken, page = 1, perPage = 10) {
  return connection.get('/v1/expenses', {
    params: {
      page_number: page,
      page_size: perPage
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function createExpense(accessToken, data) {
  return connection.post('/v1/expenses', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function updateExpense(accessToken, id, data) {
  return connection.put(`/v1/expenses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function deleteExpense(accessToken, id) {
  return connection.delete(`/v1/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
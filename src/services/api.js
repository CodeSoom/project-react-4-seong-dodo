import { exchangeLocalDate, replaceString } from '../utils/utils';

// user
export async function postLogin({ email, password }) {
  const url = '/api/login/token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken, message } = await response.json();
  const data = response;

  return { accessToken, message, data };
}

export async function postJoin({ email, password, age }) {
  const url = 'api/members';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, age }),
  });

  return response;
}

// accountbook
export async function fetchDailyTransaction({
  accessToken, dailyData: { year, month, date },
}) {
  const localDate = `${year}-${exchangeLocalDate(month)}-${exchangeLocalDate(date)}`;
  const url = `/api/member/transaction?startDate=${localDate}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function fetchMonthlyTransaction({
  accessToken, dailyData: { year, month, date },
}) {
  const localDate = `${year}-${exchangeLocalDate(month)}-${exchangeLocalDate(date)}`;
  const url = `/api/member/transaction/monthly?startDate=${localDate}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function postTransaction({
  accessToken,
  dailyData: { year, month, date },
  transaction: { type, category, transactionFields },
}) {
  const url = 'api/member/transaction';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      localDate: `${year}-${exchangeLocalDate(month)}-${exchangeLocalDate(date)}`,
      type: type === '수입' ? 'INCOME' : 'OUTCOME',
      categoryName: category.value,
      price: parseInt(replaceString(transactionFields.breakdown), 10),
      source: transactionFields.source,
      memo: transactionFields.memo,
    }),
  });

  return response;
}

export async function putTransaction({
  accessToken,
  dailyData: { year, month, date },
  transaction: {
    id, type, category, transactionFields,
  },
}) {
  const url = 'api/member/transaction';
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      localDate: `${year}-${exchangeLocalDate(month)}-${exchangeLocalDate(date)}`,
      id,
      type: type === '수입' ? 'INCOME' : 'OUTCOME',
      categoryName: category.value,
      price: parseInt(replaceString(transactionFields.breakdown), 10),
      source: transactionFields.source,
      memo: transactionFields.memo,
    }),
  });

  return response;
}

export async function deleteTransaction({ accessToken, id }) {
  const url = `/api/member/transaction?id=${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

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
  const { accessToken } = await response.json();
  return accessToken;
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
export async function postTransaction({
  accessToken,
  dailyData: {
    year, month, date,
  },
  transaction: {
    type,
    category,
    transactionFields,
  },
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

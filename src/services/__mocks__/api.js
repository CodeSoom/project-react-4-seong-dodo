export async function postLogin() {
  return {};
}

export async function postJoin() {
  return {};
}

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
  return {
    accessToken,
    dailyData: {
      year, month, date,
    },
    transaction: {
      type,
      category,
      transactionFields,
    },
  };
}

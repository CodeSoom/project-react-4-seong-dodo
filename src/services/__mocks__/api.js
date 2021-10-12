// user
export async function postLogin() {
  return {};
}

export async function postJoin() {
  return {};
}

// accountbook
export async function fetchDailyTransaction() {
  return {};
}

export async function fetchMonthlyTransaction() {
  return {};
}
export async function fetchAnnualTransaction() {
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

export async function putTransaction() {
  return { };
}

export async function deleteTransaction() {
  return { };
}

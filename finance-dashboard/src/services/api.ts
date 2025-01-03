import axios, { AxiosError } from "axios";

interface Transaction {
  description: string;
  amount: number;
  date: string;
}

interface AddTransactionResponse {
  transaction: Transaction;
}

interface FetchTransactionsResponse {
  transactions: Transaction[];
}

interface FetchTotalAmountResponse {
  balance: number;
}

const API_URL = "http://localhost:5000/api";

export const addTransaction = async (
  data: Transaction
): Promise<Transaction> => {
  const token = localStorage.getItem("token");
  const apiUrl = `${API_URL}/transactions`;
  console.log("API URL:", apiUrl);

  try {
    const response = await axios.post<AddTransactionResponse>(apiUrl, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.transaction;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error adding transaction:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<FetchTransactionsResponse>(
      `${API_URL}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Failed to fetch transactions"
        : "Unexpected error"
    );
  }
};

export const fetchTotalAmount = async (): Promise<number> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<FetchTotalAmountResponse>(
      `${API_URL}/transactions/total`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.balance;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch total amount"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

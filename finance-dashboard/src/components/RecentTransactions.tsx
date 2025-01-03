import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Spinner,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  Heading,
} from "@chakra-ui/react";

interface Transaction {
  description: string;
  amount?: number;
  date?: string;
}

const RecentTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Transaction[]>(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (err) {
        setError("Error fetching transactions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box>
      <Heading as="h2" size="md" mb={6} textAlign="center" color="teal.500">
        Recent Transactions
      </Heading>
      {transactions.length === 0 ? (
        <Text fontSize="lg" color="gray.600" textAlign="center">
          No transactions to display
        </Text>
      ) : (
        <List spacing={4} w="100%">
          {transactions.map((transaction, index) => (
            <ListItem key={index}>
              <Box
                p={4}
                borderRadius="lg"
                bg={
                  transaction.amount && transaction.amount > 0
                    ? "green.50"
                    : "red.50"
                }
                shadow="md"
                _hover={{ shadow: "lg", transform: "scale(1.02)" }}
                transition="all 0.2s ease-in-out"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <VStack align="start" spacing={1}>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={
                      transaction.amount && transaction.amount > 0
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {`${index + 1}. ${transaction.description}`}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {transaction.date
                      ? `Date: ${new Date(
                          transaction.date
                        ).toLocaleDateString()}`
                      : "No date"}
                  </Text>
                </VStack>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={
                    transaction.amount && transaction.amount > 0
                      ? "green.700"
                      : "red.700"
                  }
                >
                  {transaction.amount
                    ? `$${transaction.amount.toFixed(2)}`
                    : "No amount"}
                </Text>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecentTransactions;

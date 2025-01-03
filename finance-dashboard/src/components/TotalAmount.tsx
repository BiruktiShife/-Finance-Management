import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTotalAmount } from "../services/api";

const TotalAmount: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTotalAmount = async () => {
      try {
        const total = await fetchTotalAmount();
        setTotalAmount(total);
      } catch (err) {
        console.error("Error fetching total amount:", err);
        setError("Failed to load total amount. Please try again.");
      }
    };

    loadTotalAmount();
  }, []);

  return (
    <Box p={6} bg="white" shadow="md" borderRadius="md">
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          Total Balance: ${totalAmount?.toFixed(2) || 0}
        </Text>
      )}
    </Box>
  );
};

export default TotalAmount;

import React from "react";
import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import RecentTransactions from "./RecentTransactions";
import AddTransactionForm from "./AddTransactionForm";
import TotalAmount from "./TotalAmount";

const Dashboard: React.FC = () => {
  return (
    <Box
      bgGradient="linear(to-br, gray.50, gray.100)"
      minH="100vh"
      px={8}
      py={12}
    >
      <VStack spacing={8}>
        <Heading
          as="h1"
          fontSize="3xl"
          color="teal.600"
          textAlign="center"
          mb={4}
        >
          Finance Dashboard
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
          w="full"
        >
          <Box
            as="section"
            bg="white"
            shadow="md"
            borderRadius="lg"
            p={6}
            minHeight="300px"
          >
            <AddTransactionForm />
          </Box>
          <Box
            as="section"
            bg="white"
            shadow="md"
            borderRadius="lg"
            p={6}
            minHeight="200px"
          >
            <TotalAmount />
          </Box>

          <Box
            as="section"
            bg="white"
            shadow="md"
            borderRadius="lg"
            p={4}
            minHeight="300px"
            maxHeight="500px"
            overflowY="auto"
          >
            <RecentTransactions />
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Dashboard;

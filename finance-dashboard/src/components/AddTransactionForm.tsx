import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { addTransaction } from "../services/api";

const AddTransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.description.trim())
      errors.description = "Description is required.";

    if (!formData.amount || isNaN(Number(formData.amount))) {
      errors.amount = "Amount must be a valid number.";
    }

    if (!formData.date) errors.date = "Date is required.";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const transactionData = {
          description: formData.description,
          amount: parseFloat(formData.amount),
          date: formData.date,
        };

        await addTransaction(transactionData);

        toast({
          title: "Success",
          description: "Transaction added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setFormData({ description: "", amount: "", date: "" });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error adding transaction:", error.message);
          toast({
            title: "Error",
            description:
              error.message || "Failed to add transaction. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error("Unexpected error:", error);
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Box p={6} bg="white" shadow="md" borderRadius="md">
      <Heading as="h2" size="md" mb={6} textAlign="center" color="teal.500">
        Transaction Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && (
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Add Transaction
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddTransactionForm;

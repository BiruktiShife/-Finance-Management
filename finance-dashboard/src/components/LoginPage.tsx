import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): Errors => {
    const errors: Errors = {};

    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );

        const token = response.data.token;

        localStorage.setItem("token", token);

        window.location.href = "/dashboard";

        alert("Logged in successfully");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrors({ general: err.message || "Login failed" });
        } else {
          setErrors({ general: "An unexpected error occurred" });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      p={4}
    >
      <Box
        maxW="400px"
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        borderRadius="lg"
        p={8}
      >
        <Heading textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                bg={useColorModeValue("gray.100", "gray.600")}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                bg={useColorModeValue("gray.100", "gray.600")}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            {errors.general && (
              <FormErrorMessage>{errors.general}</FormErrorMessage>
            )}

            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;

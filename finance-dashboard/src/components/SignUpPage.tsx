import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  useToast,
} from "@chakra-ui/react";

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // Import useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      toast({
        title: "Registration successful!",
        description: response.data.message || "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Registration failed",
          description: err.message || "An error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration failed",
          description: "An unknown error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="8"
      p="8"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={6}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.username} mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpPage;

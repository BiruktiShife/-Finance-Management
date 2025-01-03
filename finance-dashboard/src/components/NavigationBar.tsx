import { Button, Flex, Heading, Spacer, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <Flex p={4} bg="blue.200" align="center">
      <Flex align="center">
        <Image
          src="/images/logo.png"
          alt="Finance Management Logo"
          boxSize="50px"
          mr={2}
          transform="scale(2)"
        />
        <Heading size="md">Finance Management</Heading>
      </Flex>
      <Spacer />
      <Button
        variant="outline"
        colorScheme="teal"
        mr={4}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button colorScheme="teal" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
    </Flex>
  );
};

export default NavigationBar;

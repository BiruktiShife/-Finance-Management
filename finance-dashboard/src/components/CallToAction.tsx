import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <Box p={8} bg="blue.200" textAlign="center">
      <Heading size="lg" mb={4}>
        Ready to Get Started?
      </Heading>
      <Text mb={6}>
        Join thousands of users managing their finances effectively.
      </Text>
      <Button colorScheme="teal" size="lg" onClick={() => navigate("/signup")}>
        Learn More
      </Button>
    </Box>
  );
};

export default CallToAction;

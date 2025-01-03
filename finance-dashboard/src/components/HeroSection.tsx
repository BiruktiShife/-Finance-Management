import { Box, Flex } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionImage = motion(Image);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HeroSection = () => (
  <Box p={8} bg="gray.100">
    <Flex
      align="center"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
    >
      <MotionImage
        src="/images/finance.png"
        alt="Finance illustration"
        boxSize={{ md: "400px" }}
        mb={{ base: 6, md: 0 }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Box
        textAlign={{ base: "center", md: "left" }}
        maxW="600px"
        ml={{ md: 8 }}
      >
        <MotionHeading
          size="2xl"
          mb={4}
          initial={{ opacity: 0, y: 50 }} // Start off-screen below with no opacity
          animate={{ opacity: 1, y: 0 }} // Fade in and slide up
          transition={{
            duration: 2, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }}
        >
          Take Control of Your Finances
        </MotionHeading>
        <MotionText
          fontSize="lg"
          mb={6}
          initial={{ opacity: 0, y: 30 }} // Start slightly below with no opacity
          animate={{ opacity: 1, y: 0 }} // Fade in and slide up
          transition={{
            duration: 1.5, // Duration of the animation
            ease: "easeOut", // Smooth easing
            delay: 0.5, // Optional delay to stagger the animation
          }}
        >
          Manage your expenses, track savings, and achieve financial goals
          effortlessly. Gain insights into spending habits for smarter financial
          decisions.
        </MotionText>
      </Box>
    </Flex>
  </Box>
);

export default HeroSection;

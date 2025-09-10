// src/components/DnDComponents/ItemOverlay.tsx
import { Box } from "@chakra-ui/react";

interface ItemOverlayProps {
  id: string;
  value: string;
}

export default function ItemOverlay ({ id, value }: ItemOverlayProps) {
  return (
    <Box
      bg="blue.500"
      color="white"
      p={4}
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      fontWeight="bold"
    >
      {value}
    </Box>
  );
};

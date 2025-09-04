import { Box } from "@chakra-ui/react";

export default function Computer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box backgroundColor={"gray.800"} borderRadius={"sm"} padding="2">
      <Box backgroundColor={"gray.100"} padding="5">
        {children}
      </Box>
    </Box>
  );
}
import { Container, Text, Stack, Float } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
export default function Header() {
  const version = process.env.npm_package_version;
  return (
    <Container 
      maxWidth={"100%"}
      background={"bg.subtle"}
      shadow={"md"}
      position={"relative"}
      centerContent={true}
    >
      <Stack padding={"20px"}>
        <Text textStyle={"xl"}>Airport Dispatcher</Text>
      </Stack>
      <Float placement={"middle-start"} offsetX={5}>
        <ColorModeButton />
      </Float>
      <Float placement={"middle-end"} offsetX="7">
        <Text textStyle={"xs"}>
          <Link href="/versions">v{version}</Link>
        </Text>
      </Float>
    </Container>
  );
}
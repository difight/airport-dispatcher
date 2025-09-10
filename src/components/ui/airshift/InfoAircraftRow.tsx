import { useQueueListIncoming } from "@/store/store";
import { useEffect, useState } from "react";
import { Box, Float, Icon, Text } from "@chakra-ui/react";
import { LuFuel } from "react-icons/lu";
import { AiOutlineColumnHeight } from "react-icons/ai";
export default function InfoAircraftRow({id}: Readonly<{id:string}>) {
  const { queueListIncoming, getOneIncomingAircraft } = useQueueListIncoming();
  const [aircraftInfo, setAircraftInfo] = useState(getOneIncomingAircraft(id));
  useEffect(() => {
    setAircraftInfo(getOneIncomingAircraft(id))
  }, [queueListIncoming]);
  return (
    <Box>
      <Float placement={"middle-start"} offsetX={5}>
        <Icon>
          <LuFuel/>
        </Icon>
        <Text pl={1}>
          {aircraftInfo?.fuel}
        </Text>
      </Float>
      <Text>
        {aircraftInfo?.name}
      </Text>
      <Float placement={"middle-end"} offsetX={5}>
        <Icon>
          <AiOutlineColumnHeight/>
        </Icon>
        <Text pr={5} pl={1}>
          {aircraftInfo?.altitude}
        </Text>
      </Float>
    </Box>
  )
}
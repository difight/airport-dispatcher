import { useQueueListIncoming } from "@/store/store";
import React, { useEffect, useState, SetStateAction } from "react";
import { Box, Float, Icon, Text } from "@chakra-ui/react";
import { LuFuel } from "react-icons/lu";
import { AiOutlineColumnHeight } from "react-icons/ai";
export default function InfoAircraftRow({id, setAlert}: Readonly<{id:string, setAlert: React.Dispatch<SetStateAction<boolean>>}>) {
  const { queueListIncoming, getOneIncomingAircraft } = useQueueListIncoming();
  const [aircraftInfo, setAircraftInfo] = useState(getOneIncomingAircraft(id));
  useEffect(() => {
    setAircraftInfo(getOneIncomingAircraft(id))
    if(aircraftInfo && aircraftInfo?.fuelPercentage <= 5) {
      setAlert(true);
    }
  }, [queueListIncoming]);
  return (
    <Box>
      <Float placement={"middle-start"} offsetX={8}>
        <Icon>
          <LuFuel/>
        </Icon>
        <Text pl={1}>
          {aircraftInfo?.fuelPercentage.toFixed(1)} %
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
          {aircraftInfo?.altitude.toFixed(1)}
        </Text>
      </Float>
    </Box>
  )
}
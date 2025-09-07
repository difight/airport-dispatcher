import { DataList } from "@chakra-ui/react";
import Aircraft from "@/core/game/aircrafts/Aircraft";
import React from "react";

export default function InfoAircraft({aircraftInfo}: Readonly<{aircraftInfo: Aircraft | undefined}>): React.ReactNode {
  if (!aircraftInfo) {
    return (
      <DataList.Root>
        <DataList.Item key={"name"}>
          <DataList.ItemLabel>Имя</DataList.ItemLabel>
          <DataList.ItemValue>Нет данных</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    )
  } else {
    return (
      <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
        <DataList.Item key={"name"} pt="4">
          
          <DataList.ItemLabel>Имя</DataList.ItemLabel>
          <DataList.ItemValue>{aircraftInfo.name}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item key={"fuel"} pt="4">
          <DataList.ItemLabel>Топливо</DataList.ItemLabel>
          <DataList.ItemValue>{aircraftInfo.fuel}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item key={"altitude"} pt="4">
          <DataList.ItemLabel>Высота</DataList.ItemLabel>
          <DataList.ItemValue>{aircraftInfo.altitude}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item key={"speed"} pt="4">
          <DataList.ItemLabel>Скорость</DataList.ItemLabel>
          <DataList.ItemValue>{aircraftInfo.currentSpeed}</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    )
  }
}
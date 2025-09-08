"use client"

import { useEffect} from "react";
import { HStack, VStack, Box } from "@chakra-ui/react";
import Computer from "@/components/computers";
import { DndContext, closestCenter, useSensor, PointerSensor, KeyboardSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ScrollArea } from "@chakra-ui/react";
import { useQueueListIncoming } from "@/store/store";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { SortableColumn } from "@/components/DnDComponents/SortableColumn";
import InfoAircraft from "@/components/airshift/InfoAircraft";
import FlowController from "@/core/game/FlowController";

export default function Incoming() {
  const { queueListIncoming, getOneIncomingAircraft } = useQueueListIncoming();

  // Преобразование данных
  const newColumnItems = queueListIncoming.map((aircraft) => ({
    id: aircraft.name,
    value: aircraft.name,
  }));

  const initialItems = {
    new: newColumnItems,
    landing: [],
    waiting: [],
    done: [],
  };

  const { items, handleDragStart, handleDragEnd, activeId } = useDragAndDrop({
    initialItems,
    onItemsChange: () => FlowController.initSystem()
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const infoAirshift = (id: string) => {
    const airshftInfo = getOneIncomingAircraft(id);
    return <InfoAircraft aircraftInfo={airshftInfo} />;
  };

  return (
    <Computer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <HStack width="100%" align="start" spacing={4}>
          {Object.entries(items).map(([name, columnItems]) => (
            <Box key={name} w="25%" p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200">
              <SortableColumn
                name={name}
                items={columnItems}
                infoAirshift={infoAirshift}
              />
            </Box>
          ))}
        </HStack>

        <DragOverlay>
          {activeId && (
            <ItemOverlay id={activeId} value={items[name].find(item => item.id === activeId)?.value || ""} />
          )}
        </DragOverlay>
      </DndContext>
    </Computer>
  );
}

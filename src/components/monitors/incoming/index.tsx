"use client"

import { useEffect } from "react";
import { HStack, Box } from "@chakra-ui/react";
import Computer from "@/components/computers";
import { DndContext, closestCenter, useSensor, PointerSensor, KeyboardSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useQueueListIncoming } from "@/store/store";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { SortableColumn } from "@/components/ui/DnDComponents/SortableColumn";
import InfoAircraft from "@/components/ui/airshift/InfoAircraft";
import InfoAircraftRow from "@/components/ui/airshift/InfoAircraftRow";
import ItemOverlay from "@/components/ui/DnDComponents/ItemOverlay";
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
  
  const { items, handleDragStart, handleDragEnd, activeId, setInitialItems } = useDragAndDrop({
    initialItems,
    onItemsChange: () => FlowController.initSystem()
  });

  useEffect(() => {
    FlowController.initSystem();
  }, []);

  useEffect(() => {
    // Обновляем начальные элементы при изменении queueListIncoming
    const newColumnItems = queueListIncoming.map((aircraft) => ({
      id: aircraft.name,
      value: aircraft.name,
    }));

    // Перезапускаем логику DnD при изменении данных
    setInitialItems({
      new: newColumnItems,
      landing: [],
      waiting: [],
      done: [],
    });
  }, [queueListIncoming]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const infoAirshift = (id: string) => {
    const aircraftInfo = getOneIncomingAircraft(id);
    return <InfoAircraft aircraftInfo={aircraftInfo} />;
  };

  const infoAircraftRow = (id: string) => {
    return <InfoAircraftRow id = {id}/>;
  }

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
                infoAirshiftRow={infoAircraftRow}
              />
            </Box>
          ))}
        </HStack>

        <DragOverlay>
          {activeId && (
            <>
              {[
                ...items.new,
                ...items.landing,
                ...items.waiting,
                ...items.done,
              ].find((item) => item.id === activeId) ? (
                <ItemOverlay
                  id={activeId}
                  value={
                    [
                      ...items.new,
                      ...items.landing,
                      ...items.waiting,
                      ...items.done,
                    ].find((item) => item.id === activeId)!.value
                  }
                />
              ) : null}
            </>
          )}
        </DragOverlay>
      </DndContext>
    </Computer>
  );
}

"use client"

import { useEffect, useState } from "react";
import Computer from "../computers";
import {
  HStack,
  VStack,
  ScrollArea,
  For,
  Text,
  Box,
  Container
} from "@chakra-ui/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FlowController from "@/core/game/FlowController";
import { useQueueListIncoming } from "@/store/store";

// Тип для элементов списка
interface Item {
  id: number;
  value: string;
}

// Тип для состояния колонок
type Columns = {
  [key: string]: any[];
};

// Добавляем типы для событий drag
interface DragStartEvent {
  active: { id: number };
}

interface DragEndEvent {
  active: { id: number };
  over: { id: string | number | null };
}

// Droppable область для колонки
function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Box ref={setNodeRef} w="100%" h="100%">
      {children}
    </Box>
  );
}

// Компонент для сортируемого элемента
function SortableItem({ id, value }: { id: number; value: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      width={"100%"}
      textAlign={"center"}
      borderRadius={"md"}
      borderWidth={"1px"}
      borderColor={"border.info"}
      backgroundColor={"bg.info"}
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      mb={2}
      zIndex={1}
      position="relative"
    >
      <Text>{value}</Text>
    </Box>
  );
}

// Overlay элемент для перетаскивания
function ItemOverlay({ id, value }: { id: number; value: string }) {
  return (
    <Box
      width={"100%"}
      textAlign={"center"}
      borderRadius={"md"}
      borderWidth={"2px"}
      borderColor={"blue.500"}
      backgroundColor={"bg.info"}
      boxShadow="lg"
      opacity={0.8}
      transform="rotate(5deg)"
    >
      <Text fontWeight="bold">{value}</Text>
    </Box>
  );
}

// Компонент для сортируемой колонки
function SortableColumn({ name, items }: { name: string; items: Item[] }) {
  return (
    <DroppableColumn id={name}>
      <VStack w={"100%"} align="stretch" spacing={3} minH="200px">
        <Text fontWeight="medium" textAlign="center" py={2}>
          {name} ({items.length})
        </Text>
        <ScrollArea.Root>
          <ScrollArea.Viewport maxH="400px" w="100%">
            <ScrollArea.Content paddingEnd="3" textStyle="sm">
              <SortableContext 
                items={items.map(item => item.id)} 
                strategy={verticalListSortingStrategy}
              >
                <For each={items}>
                  {(item) => (
                    <SortableItem 
                      key={item.id} 
                      id={item.id} 
                      value={item.value} 
                    />
                  )}
                </For>
                {items.length === 0 && (
                  <Box
                    width={"100%"}
                    textAlign={"center"}
                    borderRadius={"md"}
                    borderWidth={"2px"}
                    borderStyle="dashed"
                    borderColor={"gray.300"}
                    backgroundColor={"gray.50"}
                    py={4}
                    opacity={0.6}
                  >
                    <Text color="gray.500">Перетащите сюда</Text>
                  </Box>
                )}
              </SortableContext>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </VStack>
    </DroppableColumn>
  );
}

export default function Incoming() {
  const { queueListIncoming } = useQueueListIncoming();

  // Преобразование Aircraft → Item
  const newColumnItems = queueListIncoming.map((aircraft) => ({
    id: aircraft.name,
    value: aircraft.name,
  }));

  const [items, setItems] = useState<Columns>({
    new: newColumnItems,
    landing: [
      { id: 3, value: "H557HH" },
    ],
    waiting: [],
    done: [],
  });
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  useEffect(() => {
    const newColumnItems = queueListIncoming.map((aircraft) => ({
      id: aircraft.name,
      value: aircraft.name,
    }));

    setItems((prev) => ({
      ...prev,
      new: newColumnItems,
    }));
  }, [queueListIncoming]);
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
    
    // Найти активный элемент во всех колонках
    let foundItem = null;
    Object.values(items).forEach(column => {
      const item = column.find(item => item.id === active.id);
      if (item) foundItem = item;
    });
    setActiveItem(foundItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id;
    
    // Найти колонку активного элемента
    const activeContainer = Object.keys(items).find(key =>
      items[key].some(item => item.id === activeId)
    );
    
    // Определить целевую колонку
    let overContainer;
    
    // Если over - это элемент, найти его колонку
    const overElementContainer = Object.keys(items).find(key =>
      items[key].some(item => item.id === over.id)
    );
    
    // Если over - это колонка (droppable area)
    const overColumnContainer = Object.keys(items).includes(over?.id.toString()) ? over?.id.toString() : null;
    
    overContainer = overElementContainer || overColumnContainer;

    if (!activeContainer || !overContainer) return;

    // Если перемещение внутри одной колонки
    if (activeContainer === overContainer) {
      const columnItems = items[activeContainer];
      const activeIndex = columnItems.findIndex(item => item.id === activeId);
      
      // Если over - это элемент, найти его индекс
      if (overElementContainer) {
        const overIndex = columnItems.findIndex(item => item.id === over.id);
        if (activeIndex !== overIndex) {
          setItems(prev => ({
            ...prev,
            [activeContainer]: arrayMove(columnItems, activeIndex, overIndex)
          }));
        }
      }
    } else {
      // Если перемещение между колонками
      const activeColumn = items[activeContainer];
      const overColumn = items[overContainer];
      const activeIndex = activeColumn.findIndex(item => item.id === activeId);
      const movedItem = activeColumn[activeIndex];

      setItems(prev => ({
        ...prev,
        [activeContainer]: activeColumn.filter(item => item.id !== activeId),
        [overContainer]: [...overColumn, movedItem]
      }));
    }
  }
  FlowController.initSystem()
  return (
    <Computer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <HStack width={"100%"} align="start" spacing={4}>
          <For each={Object.entries(items)}>
            {([name, columnItems]) => (
              <Box key={name} w="25%" p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                <SortableColumn
                  name={name}
                  items={columnItems}
                />
              </Box>
            )}
          </For>
        </HStack>
        
        <DragOverlay>
          {activeItem ? (
            <ItemOverlay id={activeItem.id} value={activeItem.value} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Computer>
  );
}

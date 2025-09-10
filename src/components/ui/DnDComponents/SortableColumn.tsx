import { DroppableColumn } from "@/components/ui/DnDComponents/DroppableColumn";
import { ScrollArea, VStack, Text, Box } from "@chakra-ui/react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { For } from "@chakra-ui/react";
import { SortableItem } from "@/components/ui/DnDComponents/SortableItem";

interface Props {
  name: string;
  items: Array<{ id: string; value: string }>;
  infoAirshift: (id: string) => JSX.Element;
  infoAirshiftRow: (id: string) => JSX.Element;
}

export function SortableColumn({ name, items, infoAirshift, infoAirshiftRow }: Props) {
  return (
    <DroppableColumn id={name}>
      <VStack w="100%" align="stretch" spacing={3} minH="200px">
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
                    <Box key={item.id}>
                      <SortableItem 
                        id={item.id} 
                        value={item.value}
                        infoAirshift={infoAirshift}
                        infoAirshiftRow={infoAirshiftRow}
                      />
                    </Box>
                  )}
                </For>
                {items.length === 0 && (
                  <Box
                    width="100%"
                    textAlign="center"
                    borderRadius="md"
                    borderWidth="2px"
                    borderStyle="dashed"
                    borderColor="gray.300"
                    backgroundColor="gray.50"
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

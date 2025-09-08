import { useDroppable } from '@dnd-kit/core';
import { Box } from '@chakra-ui/react';

export function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return <Box ref={setNodeRef} w="100%" h="100%">{children}</Box>;
}

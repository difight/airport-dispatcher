import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Text } from '@chakra-ui/react';
import { Popup } from '@/components/popup';
import { InfoAircraft } from '@/components/airshift';

interface Props {
  id: string;
  value: string;
  infoAirshift: (id: string) => JSX.Element;
}

export function SortableItem({ id, value, infoAirshift }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

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
      width="100%"
      textAlign="center"
      borderRadius="md"
      borderWidth="1px"
      borderColor="border.info"
      backgroundColor="bg.info"
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      mb={2}
      zIndex={1}
      position="relative"
    >
      <Popup 
        OpenButton={<Text>{value}</Text>} 
        Content={infoAirshift(id)} 
      />
    </Box>
  );
}

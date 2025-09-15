import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@chakra-ui/react';
import Popup from '../popup';
import {useState, Dispatch, SetStateAction} from 'react';

interface Props {
  id: string;
  value: string;
  infoAirshift: (id: string) => JSX.Element;
  infoAirshiftRow: (id: string, setAlert: Dispatch<SetStateAction<boolean>>) => JSX.Element;
}

export function SortableItem({ id, value, infoAirshift, infoAirshiftRow }: Props) {
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

  const [alert, setAlert] = useState(false);

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
      borderColor={alert ? "border.error" : "border.info"}
      backgroundColor={alert ? "bg.error" : "bg.info"}
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      mb={2}
      zIndex={1}
      position="relative"
    >
      <Popup
        OpenButton={infoAirshiftRow(id, setAlert)} 
        Content={infoAirshift(id)} 
      />
    </Box>
  );
}

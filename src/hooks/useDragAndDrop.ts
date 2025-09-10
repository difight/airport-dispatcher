import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface UseDragAndDropProps {
  initialItems: Record<string, any[]>;
  onItemsChange?: (items: Record<string, any[]>) => void;
}

export function useDragAndDrop({ initialItems, onItemsChange }: UseDragAndDropProps) {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = ({ active }: { active: { id: string } }) => {
    setActiveId(active.id);
  };

  const setInitialItems = (newItems: Record<string, any[]>) => {
    setItems(newItems);
    onItemsChange?.(newItems);
  };

  const handleDragEnd = ({ active, over }: { active: { id: string }; over: { id: string | null } }) => {
    if (!over) return;

    setActiveId(null);

    const activeContainer = Object.keys(items).find(key =>
      items[key].some(item => item.id === active.id)
    );

    const overContainer = Object.keys(items).includes(over.id) ? over.id : Object.keys(items).find(key =>
      items[key].some(item => item.id === over.id)
    ) || null;

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const columnItems = items[activeContainer];
      const activeIndex = columnItems.findIndex(item => item.id === active.id);
      const overIndex = columnItems.findIndex(item => item.id === over.id);

      if (activeIndex !== overIndex) {
        setItems(prev => ({
          ...prev,
          [activeContainer]: arrayMove(columnItems, activeIndex, overIndex)
        }));
      }
    } else {
      const activeColumn = items[activeContainer];
      const overColumn = items[overContainer];
      const movedItem = activeColumn.find(item => item.id === active.id);

      if (movedItem) {
        setItems(prev => ({
          ...prev,
          [activeContainer]: activeColumn.filter(item => item.id !== active.id),
          [overContainer]: [...overColumn, movedItem]
        }));
      }
    }

    onItemsChange?.(items);
  };

  return { items, setItems, activeId, handleDragStart, handleDragEnd, setInitialItems };
}

// src/store/store.ts
import { create } from 'zustand';
import Aircraft from '@/core/game/aircrafts/Aircraft';

// Определение типа состояния
interface QueueListIncomingState {
  queueListIncoming: Aircraft[];
  addIncomingAircraft: (aircraft: Aircraft) => void;
  removeIncomingAircraft: (aircraft: Aircraft) => void;
}

// Создание стора
const useQueueListIncomingInternal = create<QueueListIncomingState>((set) => ({
  queueListIncoming: [],
  addIncomingAircraft: (aircraft: Aircraft) =>
    set((state) => ({ queueListIncoming: [...state.queueListIncoming, aircraft] })),
  removeIncomingAircraft: (aircraft: Aircraft) =>
    set((state) => ({
      queueListIncoming: state.queueListIncoming.filter((item) => item !== aircraft),
    })),
}));

// Экспорт хука для реактных компонентов
export const useQueueListIncoming = useQueueListIncomingInternal;

// Экспорт стора для использования вне реакта (например, в FlowController)
export default useQueueListIncomingInternal;

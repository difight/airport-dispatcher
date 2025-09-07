// src/store/store.ts
import { create } from 'zustand';
import Aircraft from '@/core/game/aircrafts/Aircraft';

// Определение типа состояния
interface QueueListIncomingState {
  queueListIncoming: Aircraft[];
  addIncomingAircraft: (aircraft: Aircraft) => void;
  removeIncomingAircraft: (aircraft: Aircraft) => void;
  getOneIncomingAircraft: (id: String) => Aircraft | undefined;
}

// Создание стора
const useQueueListIncomingInternal = create<QueueListIncomingState>((set, get) => ({
  queueListIncoming: [],
  addIncomingAircraft: (aircraft: Aircraft) =>
    set((state) => ({ queueListIncoming: [...state.queueListIncoming, aircraft] })),
  removeIncomingAircraft: (aircraft: Aircraft) =>
    set((state) => ({
      queueListIncoming: state.queueListIncoming.filter((item) => item !== aircraft),
    })),
  getOneIncomingAircraft: (id: String) => {
      return get().queueListIncoming.find((aircraft) => aircraft.name === id);
    }
}));

// Экспорт хука для реактных компонентов
export const useQueueListIncoming = useQueueListIncomingInternal;

// Экспорт стора для использования вне реакта (например, в FlowController)
export default useQueueListIncomingInternal;

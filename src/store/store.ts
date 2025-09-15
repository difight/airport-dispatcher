// src/store/store.ts
import { create } from 'zustand';
import Aircraft from '@/core/game/aircrafts/Aircraft';
import React from 'react';

// Определение типа состояния
interface QueueListIncomingState {
  queueListIncoming: Aircraft[];
  addIncomingAircraft: (aircraft: Aircraft) => void;
  removeIncomingAircraft: (aircraft: Aircraft) => void;
  getOneIncomingAircraft: (id: string) => Aircraft | undefined;
  updateAircraft: (id: string, updater: (aircraft: Aircraft) => Aircraft) => void;
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
  getOneIncomingAircraft: (id: string) => {
      return get().queueListIncoming.find((aircraft) => aircraft.name === id);
    },
  updateAircraft: (id: string, updater: Function) =>
    set((state) => {
      const index = state.queueListIncoming.findIndex((ac) => ac.name === id);
      if (index === -1) return state;

      const updatedAircraft = updater(state.queueListIncoming[index]);
      return {
        queueListIncoming: [
          ...state.queueListIncoming.slice(0, index),
          updatedAircraft,
          ...state.queueListIncoming.slice(index + 1),
        ],
      };
    }),
}));

// Экспорт хука для реактных компонентов
export const useQueueListIncoming = useQueueListIncomingInternal;

// Экспорт стора для использования вне реакта (например, в FlowController)
export default useQueueListIncomingInternal;

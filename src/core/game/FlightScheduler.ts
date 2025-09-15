// src/core/game/FlightScheduler.ts
import Aircraft from './aircrafts/Aircraft';
import useQueueListIncomingInternal from '@/store/store';

class FlightScheduler {
  private readonly INTERVAL = 1000; // 1 секунда
  private intervalId?: NodeJS.Timeout;

  constructor() {}

  start() {
    this.intervalId = setInterval(() => {
      this.updateAllAircraft();
    }, this.INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateAllAircraft() {
    const store = useQueueListIncomingInternal.getState();
    const aircrafts = store.queueListIncoming;

    aircrafts.forEach((aircraft) => {
      // Вызываем метод fly() и получаем обновлённый объект
      aircraft.fly(this.INTERVAL / 1000);

      // Если самолёт закончил полёт, удаляем его из очереди
      if (aircraft && !aircraft?.isFlying) {
        //store.removeIncomingAircraft(aircraft);
      } else {
        // Обновляем данные в сторе
        store.updateAircraft(aircraft?.name, () => aircraft);
      }
    });
  }
}

export default new FlightScheduler();

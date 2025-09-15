export enum AircraftType {
  PASSENGER,
  CARGO,
  MILITARY
}

export enum AircraftSize {
  SMALL,
  MEDIUM,
  LARGE
}

class Aircraft 
{
  public readonly name: string
  public readonly type: AircraftType = AircraftType.PASSENGER
  public readonly maxSpeed: number = 0
  public readonly maxFuel: number = 0
  public readonly currentSpeed: number = 0
  public readonly size: AircraftSize = AircraftSize.SMALL
  public readonly expenditure: number = 1
  public distance: number = 0
  public fuel: number = 0
  public altitude: number = 0 
  public isFlying: boolean = true // Флаг активного полета

  constructor(type: AircraftType, size: AircraftSize, expenditure: number, distance: number, maxSpeed: number, maxFuel: number) {
    this.type = type
    this.size = size
    this.expenditure = expenditure
    this.distance = distance
    this.maxSpeed = maxSpeed
    this.currentSpeed = this.#generateRandomInt(200, this.maxSpeed)
    this.name = this.#generateName(this.type, this.size)
    this.fuel = this.#generateRandomInt(5, 1800)
    this.altitude = this.#generateRandomInt(2000, 10000) // Начальная высота
    this.maxFuel = maxFuel
  }

  #generateName(type: AircraftType, size: AircraftSize): string {
    let returnName = '';
    switch(type) {
      case AircraftType.PASSENGER:
        returnName += 'P';
        break
      case AircraftType.CARGO:
        returnName += 'C';
        break
      case AircraftType.MILITARY:
        returnName += 'C';
        break
      default:
        returnName += 'U';
    }

    switch(size) {
      case AircraftSize.SMALL:
        returnName += 'S';
        break
      case AircraftSize.MEDIUM:
        returnName += 'M';
        break
      case AircraftSize.LARGE:
        returnName += 'L';
        break
      default:
        returnName += 'U';
    }

    returnName += `-${this.#generateRandomInt(1000, 9999)}`;
    return returnName;
  }

  #generateRandomInt(min: number, max: number): number {
    if (min > max) {
      throw new Error('Min cannot be greater than max')
    }
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  get fuelPercentage(): number {
    if (this.maxFuel === 0) return 0;
    return Math.max(0, Math.min(100, (this.fuel / this.maxFuel) * 100));
  }

  // Метод имитации полета
  fly(deltaTime: number): void {
    if (!this.isFlying || this.fuel <= 0 || this.altitude <= 0) {
      this.isFlying = false;
      return;
    }

    // Расход топлива
    const fuelConsumption = (this.expenditure * this.currentSpeed * deltaTime) / 10000;
    this.fuel = Math.max(0, this.fuel - fuelConsumption);

    // Снижение высоты
    const altitudeDrop = (this.currentSpeed * deltaTime) / 100;
    this.altitude = Math.max(0, this.altitude - altitudeDrop);

    // Обновление дистанции
    const distanceCovered = this.currentSpeed * deltaTime;
    if (this.distance - distanceCovered <= 0) {
      this.isFlying = false;
    }
  }
  

}


export default Aircraft;

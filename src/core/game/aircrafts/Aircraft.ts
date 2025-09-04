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

class Aircraft {
  public readonly name: string
  public readonly type: AircraftType = AircraftType.PASSENGER
  public readonly maxSpeed: number = 0
  public readonly currentSpeed: number = 0
  public readonly size: AircraftSize = AircraftSize.SMALL
  public readonly fuel: number = 0
  public readonly altitude: number = 0
  public readonly expenditure: number = 0
  public readonly distance: number = 0

  constructor(type: AircraftType, size: AircraftSize, expenditure: number, distance: number, maxSpeed: number) {
    this.type = type
    this.size = size
    this.expenditure = expenditure
    this.distance = distance
    this.maxSpeed = maxSpeed
    this.currentSpeed = this.#generateRandomInt(100, this.maxSpeed)
    this.name = this.#generateName(this.type, this.size)
    this.fuel = this.#generateRandomInt(10, 100)
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
  
  
  #generateRandomInt(min: number, max: number) {
    if (min > max) {
      throw new Error('Min cannot be greater than max')
    }
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  

}


export default Aircraft;
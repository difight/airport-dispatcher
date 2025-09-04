import Aircraft, { AircraftSize, AircraftType} from "./Aircraft";

class PassangerPlane extends Aircraft {
  constructor() {
    super(AircraftType.PASSENGER,AircraftSize.MEDIUM, 100, 1000, 300);
  }
}

export default PassangerPlane
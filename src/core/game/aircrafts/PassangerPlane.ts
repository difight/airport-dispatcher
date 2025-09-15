import Aircraft, { AircraftSize, AircraftType} from "./Aircraft";

class PassangerPlane extends Aircraft {
  constructor() {
    super(AircraftType.PASSENGER,AircraftSize.MEDIUM, 10, 3000, 300, 2000);
  }
}

export default PassangerPlane
import PassangerPlane from "./PassangerPlane";
import Aircraft from "./Aircraft";

const aicraftList = [
  PassangerPlane
]
class GeneratePlane {
  getRandomAircraft(): Aircraft {
    if (aicraftList.length === 0) {
      throw new Error('No aircrafts available.');
    };
    const randomIndex = Math.floor(Math.random() * aicraftList.length);
    return new aicraftList[randomIndex](); 
  }
}

export default new GeneratePlane()
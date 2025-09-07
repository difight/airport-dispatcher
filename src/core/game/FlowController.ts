import Aircraft from "./aircrafts/Aircraft"
import GeneratePlane from "./aircrafts/GeneratePlane"
import useQueueListIncomingInternal from "@/store/store"

class FlowController {
  readonly #MAX_QUEUE_SIZE = 10
  #queueListIncoming: Aircraft[] = []
  #quaueListLanding: Aircraft[] = []
  #queueListDeparture: Aircraft[] = []
  constructor() {
  }

  initSystem() {
    this.#addToQueueListIncoming()
  }

  #getRandomNumberForTimeout(minSec: number, maxSec: number) {
    if (minSec > maxSec) {
      throw new Error('Min cannot be greater than max')
    }
    const minCeiled = Math.ceil(minSec);
    const maxFloored = Math.floor(maxSec);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) * 1000;
  }

  #addToQueueListIncoming() {
    const timeout = this.#getRandomNumberForTimeout(1, 3)
    setTimeout(() => {
      if (this.#queueListIncoming.length < this.#MAX_QUEUE_SIZE) {
        const newAircraft = GeneratePlane.getRandomAircraft()
        this.#queueListIncoming.push(newAircraft)
        useQueueListIncomingInternal.getState().addIncomingAircraft(newAircraft)
      }
      this.#addToQueueListIncoming()
    }, timeout)
  }
}

export default new FlowController()
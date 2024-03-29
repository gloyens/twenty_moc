import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="input"
export default class extends Controller {
  static targets = ["input"]

  connect() {

  }

  doNothing(event) { // rename this
    const disabled = ["Delete", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home"];
    const ctrlDisabled = ["a", "z"];

    if (disabled.includes(event.key)) {
      console.log(`${event.key} disabled!`)
      event.preventDefault();
    }

    if (event.ctrlKey === true && (ctrlDisabled.includes(event.key))) {
      console.log(`Ctrl+${event.key} disabled!`)
      event.preventDefault();
    }
  }
}

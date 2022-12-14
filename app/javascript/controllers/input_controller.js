import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="input"
export default class extends Controller {
  connect() {

  }

  doNothing(event) {
    const disabled = ["Backspace", "Delete", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home"]

    if (disabled.includes(event.key)) {
      console.log(event.key)
      event.preventDefault();
    }
  }
}

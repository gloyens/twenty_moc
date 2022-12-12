import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="input"
export default class extends Controller {
  connect() {
    console.log("connected input")
  }

  doNothing(event) {
    const disabled = ["Backspace", "Delete", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]

    if (disabled.includes(event.key)) {
      console.log(event.key)
      event.preventDefault();
    }
  }
}

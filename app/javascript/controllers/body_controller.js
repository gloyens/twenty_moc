import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="body"
export default class extends Controller {
  static targets = ["input", "tooltip"]

  connect() {
    console.log("connected body")
  }

  copy(event) {
    const copyText = this.inputTarget.value;

    navigator.clipboard.writeText(copyText);

    this.tooltipTarget.style.opacity = 1;
    event.preventDefault();

    setTimeout(() => this.hideTooltip(), 2000);
  }

  hideTooltip() {
    this.tooltipTarget.style.opacity = 0;
  }
}

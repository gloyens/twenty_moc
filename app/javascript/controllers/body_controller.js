import { Controller } from "@hotwired/stimulus"
import { Modal } from 'bootstrap';

let seconds = 10;

let startTime = null;
let endTime = null;

let started = false;

// Connects to data-controller="body"
export default class extends Controller {
  static targets = ["input", "tooltipCopy", "tooltipTimer", "finishModal"];


  connect() {

  }

  copy(event) {
    const copyText = this.inputTarget.value;

    navigator.clipboard.writeText(copyText);

    this.tooltipCopyTarget.style.opacity = 1;
    event.preventDefault();

    setTimeout(() => this.hideTooltip(this.tooltipCopyTarget), 2000);
  }

  hideTooltip(target) {
    target.style.opacity = 0;
  }

  startTimer(event) {
    if (this.inputTarget.value.length > 0 && started === false) {
      this.tooltipTimerTarget.innerHTML = seconds;
      started = true;

      startTime = new Date();
      endTime = new Date(startTime.getTime() + (seconds * 1000))

      this.showTimer(event);

      // Timer end
      setTimeout(() => {
        let finishModal = new Modal(this.finishModalTarget, {});
        finishModal.show();

      }, (seconds * 1000));
    }
  }

  showTimer(event) {
    // Update time display
    const updater = setInterval(() => {
      function updateTimer(target) {
        let remainingTime = new Date(endTime.getTime() - Date.now());
        let remainingSecs = Math.max(0, Math.floor(remainingTime.getTime() / 1000) + 1) || 0;

        target.innerHTML = remainingSecs;
      }
      updateTimer(this.tooltipTimerTarget)
    }, 1000)

    // Stop updating
    setTimeout(function() {
      clearInterval(updater);
    }, (seconds * 1000));

    // Show
    this.tooltipTimerTarget.style.opacity = 1;
    event.preventDefault();

    // Hide
    setTimeout(() => this.hideTooltip(this.tooltipTimerTarget), 5000);
  }

}

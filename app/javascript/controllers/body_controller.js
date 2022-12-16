// REFACTOR

import { Controller } from "@hotwired/stimulus"
import { Modal } from 'bootstrap';

let seconds = 15; // Total time

let startTime;
let endTime;

let started = false;
let ended = false;

let breakTimer;
let isBreak = false;
let breakCount = 0;
let breakStartTime;
let breakTotalTime = 0;

// Connects to data-controller="body"
export default class extends Controller {
  static targets = ["input", "tooltipCopy", "tooltipTimer", "finishModal", "finishContent"];

  connect() {
    // Reset any existing timers.
    this.checkBreak;
    breakTotalTime = 0;
  }

  copy(event) {
    // Copy input text
    const copyText = this.inputTarget.value;
    navigator.clipboard.writeText(copyText);

    // Show tooltip
    this.tooltipCopyTarget.style.opacity = 1;
    event.preventDefault();

    // Hide tooltip
    setTimeout(() => this.hideTooltip(this.tooltipCopyTarget), 2000);
  }

  hideTooltip(target) {
    target.style.opacity = 0;
  }

  startTimer(event) {
    if (this.inputTarget.value.length > 0 && !started) {
      // Update timer tooltip content before it's displayed
      this.tooltipTimerTarget.innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19);


      started = true;
      startTime = new Date();
      endTime = new Date(startTime.getTime() + (seconds * 1000))

      this.showTimer(event);

      // Timer end
      setTimeout(() => {
        // End break timer if it's running
        this.checkBreak();
        clearTimeout(breakTimer);

        let finishModal = new Modal(this.finishModalTarget, {});
        this.updateFinishModal();
        finishModal.show();
        ended = true;
      }, (seconds * 1000));
    }
  }

  // Show timer tooltip
  showTimer(event) {
    if (this.inputTarget.value.length > 0) {

      // Update timer display
      const updater = setInterval(() => {
        function updateTimer(target) {
          let remainingTime = new Date(endTime.getTime() - Date.now());
          let remainingSecs = Math.max(0, Math.ceil(remainingTime.getTime() / 1000)) || 0;

          // let ISOString = remainingSecs.getSeconds.toISOString().slice(14, 19);
          const ISOString = new Date(remainingSecs * 1000).toISOString().slice(14, 19);

          target.innerHTML = ISOString;
        }
        updateTimer(this.tooltipTimerTarget)
      }, 1000)

      // Stop updating
      setTimeout(function() {
        clearInterval(updater);
      }, (seconds * 1000));

    }

    // Show
    this.tooltipTimerTarget.style.opacity = 1;
    event.preventDefault();

    // Hide
    setTimeout(() => this.hideTooltip(this.tooltipTimerTarget), 5000);
  }

  // Count breaks of more than 5s
  checkBreak(event) {
    if (ended) { return false } // This doesn't work. Seems to reset ended to false after popup(?)

    if (isBreak === false) {
      clearTimeout(breakTimer);
      // Start timer in 5s
      breakTimer = setTimeout(() => {
        breakStartTime = Date.now();
        console.log("Break started!");
        isBreak = true;
        breakCount += 1;
      }, 5000)

    } else {
      // Stop timer
      isBreak = false;

      console.log("Break ended!");
      let totalTime = Date.now() - breakStartTime;
      console.log("Break lasted " + totalTime + "ms.");
      breakTotalTime += totalTime;
      console.log("Total break time is " + breakTotalTime + "ms.");
      this.checkBreak();
    }
  }

  // Update content on completion modal
  updateFinishModal() {
    this.finishContentTarget.innerHTML = `You stopped ${breakCount} times for a total of ${breakTotalTime}ms!`
  }
}

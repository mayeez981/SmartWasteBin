import { db, auth } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --------------------
// Google reCAPTCHA
// --------------------

if (document.getElementById("recaptcha-container")) {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
}

window.addEventListener("DOMContentLoaded", () => {

  // --------------------
  // SEND OTP
  // --------------------

  const sendOtpBtn = document.getElementById("sendOtp");

  if (sendOtpBtn) {

    sendOtpBtn.onclick = async () => {

      try {

        const phone =
          "+91" + document.getElementById("phone").value;

        const appVerifier = window.recaptchaVerifier;

        window.confirmationResult =
          await signInWithPhoneNumber(
            auth,
            phone,
            appVerifier
          );

        alert("OTP Sent Successfully!");

      } catch (error) {

        console.log(error);
        alert(error.message);

      }

    };

  }

  // --------------------
  // VERIFY OTP
  // --------------------

  const verifyOtpBtn =
    document.getElementById("verifyOtp");

  if (verifyOtpBtn) {

    verifyOtpBtn.onclick = async () => {

      try {

        const code =
          document.getElementById("otp").value;

        await window.confirmationResult.confirm(code);

        alert("Login Successful!");

        const statusCard =
          document.getElementById("statusCard");

        if (statusCard) {
          statusCard.style.display = "block";
        }

        checkBin();

        window.location.href = "instructions.html";

      } catch (error) {

        alert("Invalid OTP");

      }

    };

  }

  // --------------------
  // BIN STATUS
  // --------------------

  async function checkBin() {

    const docRef = doc(db, "binstatus", "current");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      let binLevel = docSnap.data().level;

      console.log("Firestore data:", docSnap.data());
      console.log("binLevel =", binLevel);

      document.getElementById("fillLevel").innerHTML = binLevel + "%";
      const fillLevelBar = document.getElementById("fillLevelBar");

if (fillLevelBar) {
    fillLevelBar.style.width = binLevel + "%";
    fillLevelBar.innerHTML = binLevel + "%";
    const warning = document.getElementById("warningMessage");

if (binLevel >= 90) {
    warning.innerHTML = "⚠️ Warning: Bin is Full!";
    warning.style.color = "red";
    warning.style.fontWeight = "bold";
} else {
    warning.innerHTML = "";
}

    if (binLevel >= 90) {
        fillLevelBar.style.background = "#f44336"; // Red
    } else if (binLevel >= 50) {
        fillLevelBar.style.background = "#FFC107"; // Yellow
    } else {
        fillLevelBar.style.background = "#4CAF50"; // Green
    }
}

if (binLevel >= 90) {
    document.getElementById("lidStatus").innerHTML = "🔴 Bin Full";
} else if (binLevel >= 50) {
    document.getElementById("lidStatus").innerHTML = "🟡 Bin Half Full";
} else {
    document.getElementById("lidStatus").innerHTML = "🟢 Bin Empty";
}

      const lastUpdated =
        document.getElementById("lastUpdated");

      if (lastUpdated) {

        lastUpdated.innerHTML =
          "Last Updated : " + new Date().toLocaleString();

      }

    } else {
    document.getElementById("fillLevel").innerHTML = "No data";
    document.getElementById("lidStatus").innerHTML = "No data";
}

    

  }

  // Make function available globally
  window.checkBin = checkBin;
  const historyBtn = document.getElementById("historyBtn");
if (historyBtn) {
    historyBtn.style.display = "block";
}

}); // End DOMContentLoaded


// --------------------
// SIDE MENU
// --------------------

function toggleMenu() {

  const sideMenu = document.getElementById("sideMenu");

  if (sideMenu) {

    sideMenu.classList.toggle("active");

  }

}

window.toggleMenu = toggleMenu;
// Load bin status automatically
window.addEventListener("load", () => {
    checkBin();
});
// Auto refresh every 5 seconds
setInterval(checkBin, 5000);

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Submit button clicked");

    const name = document.getElementById("name").value;
    const issueType = document.getElementById("issueType").value;
    const description = document.getElementById("description").value;

    try {
        await addDoc(collection(db, "reports"), {
            name: name,
            issueType: issueType,
            description: description,
            createdAt: serverTimestamp()
        });

        alert("Report submitted successfully!");

// Clear all fields
document.getElementById("name").value = "";
document.getElementById("issueType").selectedIndex = 0;
document.getElementById("description").value = "";

    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
});
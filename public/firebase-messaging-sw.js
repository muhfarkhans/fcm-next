importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "",
  projectId: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

let messaging;
try {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      console.log("Received background message: ", payload);
    });
  }
} catch (err) {
  console.error("Failed to initialize Firebase Messaging", err);
}

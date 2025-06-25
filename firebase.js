//Agregar firebase
// import { initializeApp } from 'firebase/app';
// import { getStorage } from "firebase/storage";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase
// Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
document.addEventListener("DOMContentLoaded", () => {
  // Verificar que Firebase y la config estén disponibles
  if (typeof firebase === "undefined") {
    console.error("Firebase no está cargado");
    return;
  }

  if (!window.FirebaseConfig) {
    console.error("Configuración de Firebase no encontrada");
    return;
  }
  // Inicializa Firebase
  firebase.initializeApp(FirebaseConfig);
  const storage = firebase.storage();

  const form = document.getElementById("upload-image-test");
  const input = document.getElementById("image-input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = input.files[0];
    if (!file) {
      alert("Selecciona una imagen");
      return;
    }
    try {
      const storageRef = storage.ref(`imagenes/${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      alert("Imagen subida correctamente. URL: " + url);
    } catch (error) {
      alert("Error al subir la imagen");
      console.error(error);
    }
  });
});

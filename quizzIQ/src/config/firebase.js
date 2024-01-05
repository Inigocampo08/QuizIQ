import { initializeApp } from 'firebase/app'

  const firebaseConfig = {
    apiKey: "AIzaSyAztY33_VLedn8FGj4fibFiH3KgForHYQA",
    authDomain: "quiziq-cf21e.firebaseapp.com",
    projectId: "quiziq-cf21e",
    storageBucket: "quiziq-cf21e.appspot.com",
    messagingSenderId: "380231797761",
    appId: "1:380231797761:web:7d03a5253054a35b458400"
  };


export const firebaseApp = initializeApp(firebaseConfig)

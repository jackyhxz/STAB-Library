import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBt6FCO7JIgv1DE5vEQTVUtIGeh_JFIrs",
    authDomain: "library-18c5c.firebaseapp.com",
    projectId: "library-18c5c",
    storageBucket: "library-18c5c.appspot.com",
    messagingSenderId: "910458485614",
    appId: "1:910458485614:web:16261dc0da1ff750a99f7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// runs the function when refreshing the page: to get the books from firebase
export const getBookData = async function(){
    const booksInDatabase = await getDocs(collection(db, "library"));
    var books = [];
    booksInDatabase.forEach((book) => {
        books.push(book.data().title, book.data().author, book.data().summary, book.data().genre, book.data().room, book.data().shelf);
    })
    //localStorage.setItem("book-sheet", book);//send the data to local storage
    //localStorage.setItem("book-count", booksInDatabase.data().count);
    //console.log("refresh");
    display(books);
}



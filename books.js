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
//this takes a file and uploads it to the database
//to run you need to make an upload file html input with
//id called URL
export async function importToDatabase () {
  const booksInDatabase = await getDocs(collection(db, "library"));
    booksInDatabase.forEach((book) =>{
        deleteDoc(doc(db, "library", book.id));
    }
    )
  // try{
   var file = document.getElementById("bookcsv").files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          var csvData = event.target.result;
          var rows = csvData.split("\n");
          for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // split is just to include comma in the string without messing up the formatting, look at https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
            console.log(cells);
            try {
                //console.log(cells[0]);
              const docRef = addDoc(collection(db, "library"), {
                title: cells[0], 
                subtitle: cells[1],
                author: cells[2],
                author_last_first: cells[3],
                translator: cells[4],
                publisher: cells[5],
                year_published: cells[6],
                genre: cells[7],
                summary: cells[8],
                number_of_page: cells[9],
                language: cells[10],
                ISBN: cells[11],
                building: cells[12],
                room: cells[13],
                shelf: cells[14],
                books_checked: cells[15],
                total_copies: cells[16],
                school_email: cells[17],
                // need a list for each copies?
              });
              console.log("Document written with ID: ", docRef.id);
            } 
            catch (e) {
              console.error("Error adding to database: ", e);
            }
            
          }
        };
        reader.readAsText(file);

  document.getElementsByTagName("body").style.cursor = "auto";
}

export const getBookData = async function(){
    const booksInDatabase = await getDocs(collection(db, "library"));
    
}

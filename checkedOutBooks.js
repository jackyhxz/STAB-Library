// This js will be for CHECKEDOUTBOOKS.HTml
//make it so when we enter an email it will show the books with your email and marked as Checked-Out
//if there are no books with your email, then it will return "your email is not associated with any books"
//if your email is only associated with returned books then it will show the books and say it is returned
//if your have a book checkedout under your email then it will show the book
//next to the checkout book there will be a "return" button and maybe other buttons

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

export async function importToDatabase () {
    const booksInDatabase = await getDocs(collection(db, "library"));
      booksInDatabase.forEach((book) =>{
          deleteDoc(doc(db, "library", book.id)); //deleteDoc basically deletes everything in the firebase before uploading again
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

// runs the function when first open the page: to get the books from firebase
export const bookDataFirebase = async function(){
    const booksInDatabase = await getDocs(collection(db, "library"));
    var books = [];
    booksInDatabase.forEach((book) => {
        books.push(book.data().title, book.data().author, book.data().summary, book.data().genre, book.data().room, book.data().shelf);
    })
    localStorage.setItem("book-data", JSON.stringify(books));//send the data to local storage
    //console.log(JSON.parse(localStorage.getItem("book-data")));
    console.log("Store the data locally successful");
}

// first check if the book already exists in the local storage (which means that the user hasn't closed the website since last load), it uses local data to display
// if local data not exists (which means the user just opened the website), then the 
export const getBookData = async function(){ 
    if(localStorage.getItem("book-data") !== null){ 
        var books = JSON.parse(localStorage.getItem("book-data"));
        display(books);
        console.log("suc-from-local-storage");
    }else{
        bookDataFirebase();
    }
}

//or book.data().school_email.includes(school)

for (let i = 0; i < spreadSheet.data.length; i++) {
    if (spreadSheet.data[i].School_Email.toLowerCase() == document.getElementById("searching-for-checked-out-books").value) {
        if (!(document.getElementById("users-checked-out-books").value.includes(spreadSheet.data[i].Title))) {
            document.getElementById("users-checked-out-books").innerHTML = document.getElementById("users-checked-out-books").innerHTML += spreadSheet.data[i].Book_Title;
        }
    } 
// else{
    // console.log("looks like you dont have anything checked out. LLLLLLL")
// }
}

    

//what iM THINKING OF DOING IS MAKING A FOR LOOP THEN DOING arr[i].includes(SCHOOL EMAil)
  //when email entered and the books checkut shows, it will show the Title and the Author
  //on the backend, however, it will also have the books ISBN
  //the reason is because we want to make it so when the return button is pressed..
  //we get the data from the firebase and search it for the book using the associated ISBN
  //once the books code is found, we write the code so that it changes the email associated with that book
  
  //how will we be able to check to see if the book has succesfully being returned
  //i dont want to grab the firebase data once more to confirm that it worked because I feel like it would lag the site

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

export function autoFill() {
    if (typeof localStorage.getItem("checkOutBook") !== null) {
        var cur_ISBN = localStorage.getItem("checkOutBook");

        if(localStorage.getItem("book-data") !== null){ 
            var books = JSON.parse(localStorage.getItem("book-data"));
            console.log("suc-from-local-storage");
        }
        for(let i = 0; i < books.length; i += 7){
            if(books[i + 6] == cur_ISBN){
                var cur_TITLE = books[i];
                var cur_AUTHOR = books[i + 1];
            }
        }
        document.getElementById("check-out-form-book-title").innerHTML = "Title:  " + cur_TITLE;
        document.getElementById("cur_Author").innerHTML = "Author:  " + cur_AUTHOR;
    }
    document.getElementById("check-out-book-button").addEventListener("click", ()=> {
        submitForm(cur_ISBN);
    })
}

export const submitForm = async function (ISBN){
    //try{
        const booksInDatabase = await getDocs(collection(db, "library"));
        booksInDatabase.forEach((book) => {
            // if no book on the shelf???
            if(book.data().ISBN == ISBN){
                const cur_bookRef = book; //doc(db, "library", "book");
                let totalCopies = cur_bookRef.data().total_copies;
                let booksChecked = cur_bookRef.data().books_checked;
                booksChecked += 1;
                let checkedOutEmail = cur_bookRef.data().school_email;
                // to get "copy on shelf", "check out email list"...of that doc and update them in the upDateDoc
                if(totalCopies - booksChecked == 0){
                    //an alert
                    return;
                }else{   
                    let cur_student_email = document.getElementById("check-out-form-name-book").value;
                    checkedOutEmail.push(cur_student_email); 
                }
                const curRef = doc(db, "library", book.id); // need to use a documentReference type instead of a documentSnapshot
                updateDoc(curRef, {
                    books_checked: booksChecked,
                    school_email: checkedOutEmail
                });
                document.getElementById("check-out-book-button").value = "";
                alert("Book successfully checked out! Return to the book page...");
                location.href = "books.html";
            }
            
        })
    //}
    //catch(e){
        //console.log("Failed to check out due to upload error...");
    //}
}

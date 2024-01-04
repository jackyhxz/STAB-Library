import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

export const autoFill = async function(){
    if (typeof localStorage.getItem("checkOutBook") !== null) {
        var cur_ID = localStorage.getItem("checkOutBook");

        if(localStorage.getItem("book-data") !== null){ 
            var books = JSON.parse(localStorage.getItem("book-data"));
            console.log("suc-from-local-storage");
        }
        for(let i = 0; i < books.length; i += 8){
            if(books[i + 7] == cur_ID){
                var cur_TITLE = books[i];
                var cur_AUTHOR = books[i + 1];
            }
        }
        document.getElementById("check-out-form-book-title").innerHTML = "Title:  " + cur_TITLE;
        document.getElementById("cur_Author").innerHTML = "Author:  " + cur_AUTHOR;
        const cur_Ref = doc(db, "library", cur_ID);; //doc(db, "library", "book");
        const cur_bookSnap = await getDoc(cur_Ref);
        var copies_left = cur_bookSnap.data().total_copies - cur_bookSnap.data().books_checked;
        document.getElementById("cur_Copies").innerHTML = "Copies Left:  " + copies_left;
    }
    document.getElementById("check-out-book-button").addEventListener("click", ()=> {
        submitForm(cur_ID, copies_left);
    })
}

export const submitForm = async function (ID, copies_left){
    try{
        const booksInDatabase = await getDocs(collection(db, "library"));
        //booksInDatabase.forEach((book) => {
            //if(book.data().ISBN == ISBN){
                const cur_Ref = doc(db, "library", ID);; //doc(db, "library", "book");
                const cur_bookSnap = await getDoc(cur_Ref);
                var booksChecked = cur_bookSnap.data().books_checked;
                booksChecked += 1;
                var checkedOutEmail = cur_bookSnap.data().school_email;
                // to get "copy on shelf", "check out email list"...of that doc and update them in the upDateDoc
                if(copies_left == 0){
                    alert("There is no copy left...Sorry...Return to the book page...");
                    location.href = "books.html";
                }else{   
                    let cur_student_email = document.getElementById("check-out-form-name-book").value;
                    checkedOutEmail.push(cur_student_email); 
                }
                //console.log(booksChecked);
                //console.log(checkedOutEmail);
                //console.log(ID);
                // need to use a documentReference type instead of a documentSnapshot
                await updateDoc(cur_Ref, {
                    books_checked: booksChecked,
                    school_email: checkedOutEmail
                });
                document.getElementById("check-out-book-button").value = "";
                alert("Book successfully checked out! Return to the book page...");
                location.href = "books.html";
            //}
            
        //})
    }
    catch(e){
        alert("Failed to check out due to upload error. Please contact Mr. Taylor...Return to the book page...");
        location.href = "books.html";
    }
}

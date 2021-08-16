//Requirement for our project

//We are a book management company 

//BOOKS 
//ISBN, title, pub date, language, num page, author[], category[]

//AUTHORS
//id, name, books[]

//PUBLICATIONS
//id, name, books[]

//We have to design and code an API over this . 

//1. BOOKS 
//We need an API :- 
//To get all the books 
//To get specific book 
//To get a list of books based on category 
//To get a list of books based on languages 

//2. AUTHORS
//We need an API :-
//To get all the authors 
//To get a specific author 
//To get a list of authors based on book

//3. PUBLICATIONS
//We need an API :-
//To get all the publications 
//To get a specific publication
//To get a list of publications based on a book

//POST REQUEST
//1. ADD NEW BOOK
//2. ADD NEW PUBLICATION
//3. ADD NEW AUTHOR 

//PUT
//UPDATE BOOK DETAILS IF AUTHOR IS CHANGED

//DELETE
//1. DELETE A BOOK
//2. DELETE AUTHOR FROM BOOK AND RELATED BOOK FROM AUTHOR

//SCHEMA- BLUEPRINTS OF HOW DATA HAS TO BE CONSTRUCTED
//MONGODB IS SCHEMALESS
//MONGOOSE HAS SCHEMA
//MONGOOSE - VALIDATION, RELATIONSHIP WITH OTHER DATA
//MODEL-> DOCUMENT MODEL OF MONGODB
//SCHEMA ->MODEL -> USE THEM
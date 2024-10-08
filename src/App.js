import React, { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { Button, TextField } from '@mui/material';
import "./App.css"

import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from 'react-redux';


const App = () => {
  const [books, setBooks] = useState();
  const [searchBook, setSearchBook] = useState({
    title: '',
    author: '',
    publishDate: '',
    genre: ''

  })

  const booksList = useSelector((state) => state?.books);



  const handleDate = (e) => {
    // console.log(e.$d);
    // console.log(dayjs(e.$d).format("MMMM DD, YYYY "));
    setSearchBook(prev => ({ ...prev, publishDate: dayjs(e.$d).format("MMMM DD, YYYY ") }))
  }

  const handleChange = (e) => {
    setSearchBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = ()=>{
    const arr = []

    if(searchBook.title){
      booksList.map((val)=>{
        if(val.title.includes(searchBook.title)){
          arr.push(val)
        }
      })
    }
    if(searchBook.author){
      booksList.map((val)=>{
        if(val.author.includes(searchBook.author)){
          arr.push(val)
        }
      })
    }
    if(searchBook.genre){
      booksList.map((val)=>{
        if(val.genre.includes(searchBook.genre)){
          arr.push(val)
        }
      })
    }
    if(searchBook.publishDate){
      booksList.map((val)=>{
        console.log(val.publishDate, 'vsl');

        console.log(searchBook.publishDate,'search');
        
        
        if(val.publishDate == searchBook.publishDate){
          arr.push(val)
        }
      })
    }

    setBooks(arr)
  }

  useEffect(()=>{
    // localStorage.setItem("books", books)
    setBooks(booksList)
  },[booksList])


  return (
    <div className="app">
      <h1>Book Management System</h1>
      <div className='search'>
        <div className='searchField'>
          <TextField
            sx={{ margin: '10px', }}
            className="srchFld"
            id="outlined-basic"
            variant="outlined"
            value={searchBook["title"] || ""}


            label="Title"
            name='title'
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            sx={{ margin: '10px', }}
            className="srchFld"
            variant="outlined"
            value={searchBook["author"] || ""}

            label="Author"
            name='author'
            onChange={handleChange}
          />
          <TextField
            sx={{ margin: '10px', }}
            className="srchFld"
            id="outlined-basic"
            variant="outlined"
            value={searchBook["genre"] || ""}

            label="Genre"
            name='genre'
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}
            adapterLocale={"en-gb"}
          >
            {/* <DemoContainer components={['DatePicker']}> */}
            <DatePicker label="Publication Date"

              name={"publishDate"}
              value={searchBook["publishDate"] ? dayjs(searchBook["publishDate"]) : null}
              className="modalInputField datepicker-padding srchFld"
              sx={{ margin: '10px', }}
              onChange={handleDate}
              format='DD-MM-YYYY'
              onError={false}
              views={["year", "month", "day"]}
              renderInput={(props) => (
                <TextField
                  {...props}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onKeyDown={(e) => e.preventDefault()}
                />
              )} />
            {/* </DemoContainer> */}
          </LocalizationProvider>
        </div>


        <div className='btns'>
          <Button variant='contained' sx={{ margin: '7px' }} onClick={handleSearch}>Search</Button>
          
        <BookForm   />
          <Button variant='outlined' sx={{ margin: '7px' }} onClick={()=>{
            setBooks(booksList)
            setSearchBook({
              title: '',
              author: '',
              publishDate: '',
              genre: ''
          
            })
          }}>Clear</Button>
        </div>
      </div>

      

     
      <div className='bookListBTN'>

      <BookList books={books}  />
      </div>
    </div>
  );
};

export default App;

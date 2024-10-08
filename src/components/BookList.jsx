import React from 'react';
import BookItem from './BookItem';
import {  useSelector } from 'react-redux';

const BookList = ({books}) => {

  
  return (
        <>
            <div   >
                <h1 style={{ margin: '7px', textAlign: 'center', }}> <u>Book List</u></h1>


            </div>
            <div className="book-list">
                {books?.map((book) => {
                    return (

                        <BookItem
                            key={book?.id}
                            book={book}
                        />
                    )
                })}
            </div>
        </>

    );
};

export default BookList;

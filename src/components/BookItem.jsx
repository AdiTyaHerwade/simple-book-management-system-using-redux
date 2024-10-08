import { Button } from '@mui/material';
import React, { useState } from 'react';
import BookForm from './BookForm';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import  {deleteBook}  from '../redux/bookSlice';
import BookUpdate from './BookUpdate';

const BookItem = ({ book, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(book.title);
    const [updatedAuthor, setUpdatedAuthor] = useState(book.author);
    const [editModal, setEditModal] = useState(false)
    const [editIndex, setEditIndex] = useState()
    const dispatch = useDispatch();

    // const handleUpdate = () => {
    //     updateBook(book.id, { ...book, title: updatedTitle, author: updatedAuthor });
    //     setIsEditing(false);
    // };

    const updateBook = (book)=>{
        
    }

    console.log(book);
    

    return (
        <div className="bookItem">

            <h2>Title: {book?.title}</h2>
            <div className='bookDtl'>

                <p>Author: {book?.author}</p>
                <p>Genre: {book?.genre}</p>
                <p>Published Date: {dayjs(book?.publishDate).format("DD MMM YYYY ") }</p>
            </div>
            <div className='bookBtn'>
                {/* <Button variant='outlined' sx={{margin: '4px'}} onClick={() => {
                    setEditIndex(book)
                    setEditModal(true)}}>Edit</Button> */}
                     <BookUpdate book={book} />
                <Button variant='outlined' sx={{margin: '4px', padding: '0 10px'}} onClick={() =>  dispatch(deleteBook(book.id))}>Delete</Button>
            </div>
            <div>

                <img src={book?.img?.url} alt={book?.img?.name} className="cover-preview" style={{ width: '80%', margin: '10px' }} />
            </div>


        </div>
    );
};

export default BookItem;

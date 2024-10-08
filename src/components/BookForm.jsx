import { Button, Modal, TextField, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import  {addBook}  from '../redux/bookSlice';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid2';





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '70vh',
    overflow:  'auto !important',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius:"10px"
    
};

const styleMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '70vh',
    overflow:  'auto !important',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius:"10px"
    
};

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const BookForm = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:900px)");
    const [addModal, setAddModal] = React.useState(false);
    const [data, setData] = useState({})
    const [selectedFile, setSelectedFile] = useState()

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState(null);
    const dispatch = useDispatch();


    const addBooks = (newBook) => {
        console.log(addBook);
         dispatch(addBook(newBook))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = { id: Date.now(), title, author, cover };
        addBook(newBook);
        setTitle('');
        setAuthor('');
        setCover(null);
    };

    const handleCoverChange = (e) => {
        setCover(URL.createObjectURL(e.target.files[0]));
    };

    const handleDate = (e) => {
        setData(prev => ({ ...prev, publishDate: dayjs(e.$d).format("MMMM DD, YYYY ") }))
    }

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile({ url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name });
        // setEnable(false)

    };

    return (

        <>
            <Button variant='contained' sx={{ margin: '7px' }} onClick={() => setAddModal(true)}>Add</Button>
            <Modal
                open={addModal}
                onClose={() => setAddModal(false)}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                closeAfterTransition

            >
                <Box sx={isNonMobileScreens ? style : styleMobile}  >

                    <div className='addFlds'>
                    <Grid container spacing={1}>
                    <Grid size={{sm:12,md:12,lg:6}}>
                        <TextField
                        fullWidth
                            sx={{ margin: '10px', }}
                            className="srchFld"
                            id="outlined-basic"
                            variant="outlined"
                            value={data["title"] || ""}


                            label="Title"
                            name='title'
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid size={{sm:12,md:12,lg:6}}>
                        <TextField
                        fullWidth
                            id="outlined-basic"
                            sx={{ margin: '10px', }}
                            className="srchFld"
                            variant="outlined"
                            value={data["author"] || ""}

                            label="Author"
                            name='author'
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid size={{sm:12,md:12,lg:6}}>
                        <TextField
                        fullWidth
                            sx={{ margin: '10px', }}
                            className="srchFld"
                            id="outlined-basic"
                            variant="outlined"
                            value={data["genre"] || ""}

                            label="Genre"
                            name='genre'
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid size={{sm:12,md:12,lg:6}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                        >
                            {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="Publication Date"
                            fullWidth
                                name={"publishDate"}
                                value={data["publishDate"] ? dayjs(data["publishDate"]) : null}
                                className="modalInputField datepicker-padding "
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
                        </Grid>
                        



                        </Grid>

                    </div>
                    <Button
                            component="label"
                            className="srchFld"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            href="#file-upload"
                            onChange={handleFileChange}
                            sx={{
                                width: "auto",
                                margin: "10px",
                                height: "auto",
                                maxWidth: '80%'
                            }}
                        >
                            {selectedFile ? selectedFile.name : "Select a file"}

                            <VisuallyHiddenInput type="file" accept={"image/*"} />
                        </Button>
                    <div className="modalImg">

                        {selectedFile && <img src={selectedFile.url} alt="Book Cover" className="cover-preview" style={{ width: '80%', margin: '10px' }} />}
                    </div>
                    <div className="modalBtn">

                        <Button variant='contained' sx={{ margin: '7px' }} onClick={() => {
                            addBooks({ ...data, img: selectedFile, id: Date.now() })
                            setAddModal(false)
                            setData({})
                            setSelectedFile()
                        }}>Add Book</Button>
                        <Button variant='outlined' sx={{ margin: '7px' }} onClick={() => {
                            setData({})
                            setSelectedFile()
                            setAddModal(false)
                        }}>Close</Button>
                    </div>

                </Box>
            </Modal>
        </>




    );
};



export default BookForm;

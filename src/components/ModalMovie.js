
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function ModalMovie(props) {
    // for add a comment on movie 
    const url = "http://localhost:3001/addMovie";

    const addComment = (e) => {

        e.preventDefault();
        const obj = {
            title: props.clickedMovie.title,
            release_date: props.clickedMovie.release_date,
            poster_path: props.clickedMovie.poster_path,
            overview: props.clickedMovie.overview,
            comment: e.target.comment.value || ""
        }

        console.log(obj);

        axios.post(url, obj)
            .then(response => {
                console.log(response);
                console.log('success');
            })
            .catch(error => {
                console.log(error);
            });
    }
    // for update a comment on movie 

    const updateComment = (e) => {

        const url = `http://localhost:3001/updateMovieById/${props.clickedMovie.id}`;
        e.preventDefault();
        const obj = {
            title: props.clickedMovie.title,
            release_date: props.clickedMovie.release_date,
            poster_path: props.clickedMovie.poster_path,
            overview: props.clickedMovie.overview,
            comment: e.target.comment.value || ""
        };

        axios.put(url, obj)
            .then(response => {
                console.log('PUT request successful');
                const updatedMovie = response.data.updatedMovie;

                const updatedMovies = props?.moviesFavorite?.map(movie => {
                    if (movie.id === updatedMovie.id) {
                        return updatedMovie;
                    }
                    return movie;
                });
                props.updateFavoriteMovies(updatedMovies);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Movie Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={props.isFavPage ? updateComment : addComment} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w400${props.clickedMovie.poster_path}`} />
                        <h3 style={{ textAlign: "center" }}>{props.clickedMovie.title}</h3>
                        <Form.Group className="mb-3">
                            {props.isFavPage &&
                                <>
                                    <Form.Label>Edit a comment</Form.Label>
                                    <Form.Control
                                        name='comment'
                                        defaultValue={props.clickedMovie.comment || ''}
                                        placeholder="Enter your comment"
                                    />
                                </>
                            }
                            {!props.isFavPage &&
                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Add a comment</Form.Label>
                                        <Form.Control name='comment' placeholder="Enter your comment" />
                                    </Form.Group>
                                </>
                            }
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            Submit and add to fav page
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal >

        </>
    );
}

export default ModalMovie;

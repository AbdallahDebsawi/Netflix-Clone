import { Col, Row } from "react-bootstrap";
import Movie from "./Movie";
import ModalMovie from "./ModalMovie";
import { useState, useEffect } from "react";
import axios from "axios";

function MovieList({ moviesData }) {
    const [show, setShow] = useState(false);
    const [clickedMovie, setClickedMovie] = useState({});

    const handleClose = () => {
        setShow(false)
    }
    const showModal = (item) => {
        setShow(true)
        console.log(item);
        setClickedMovie(item)
    }
    return (
        <>
            <Row>
                {moviesData.map(item => (
                    <Col key={item.id}>
                        <Movie item={item} showModal={showModal} />
                    </Col>
                ))}
            </Row>
            <ModalMovie show={show} handleClose={handleClose} clickedMovie={clickedMovie} />

        </>
    );
}

export default MovieList;

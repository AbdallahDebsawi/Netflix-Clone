import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
function Home() {

    const [moviesData, setMoviesData] = useState([]);
    const getAllMovies = () => {

        const serverURL = 'http://localhost:3001/trending';
        axios.get(serverURL)
            .then(response => {
                //store the data in setMoviesData so i can use it in child component
                setMoviesData(response.data);
            })
            .catch((error) => {
                console.log('error in get trending: ', error);
            });
    }
    //this run once you load the page
    useEffect(() => {
        getAllMovies();
    })
    return (
        <>
            <MovieList moviesData={moviesData} />
        </>
    );
}

export default Home;

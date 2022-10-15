import Result from './Components/Result';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';



const APIURL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setmovies] = useState([]);
  const [search, setsearch] =useState("");

  const ChangeTheSearch =(e)=>{

   
    setsearch(e.target.value)
  }
  const getAllMovies = () => {
          axios.get(APIURL)
          .then(
              (success)=>{
              
                setmovies(success.data.results)
              }
          )
          .catch(
              (error)=>{
                console.log(error)
              }
          )
  }
  const getSearchedMovies =()=>{

    axios.get(SEARCHAPI+search)
    .then(
     (success)=>{
      setmovies(success.data.results)
     }
    )
    .catch(
      (error)=>{
        console.log(error)
      }
    )
  }
  useEffect(
   ()=>{

      setmovies([]);
     // console.log("hello")
      if(search == "")
      {
        getAllMovies();
      }
      else{
        getSearchedMovies();
      }

    },
    [search]
  )

  return (
    
    <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3">
    <h1 className='text-left text-black mt-3 mb-5 font-bold '>Search Your favorite movie</h1>
    <input type="search" value={search} onChange={ChangeTheSearch} className='w-full border text-slate-800 p-4 border-black rounded'/>
    {
      movies.length === 0
      ?<div className='text-5xl text-red-500 mt-5 text-center font-bold'>Loading...</div>
      : <Result movies={movies}/>
    
    }
    
    </div>
  );
}

export default App;

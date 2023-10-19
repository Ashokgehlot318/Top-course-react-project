import React from "react";
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import Spiner from './components/Spiner';
import { apiUrl , filterData} from './data';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


const App = () => {

  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].titile)

    const fetchData = async() =>{
      setLoading(true);
      try{
        const res = await fetch(apiUrl);
        const output = await res.json();

        setCourses(output.data);
        // save data into a variable
        console.log(output);
      }
      catch(error){
        toast.error("somthing went wrong");
      }

      setLoading(false);
    }

    useEffect( ()=>{
      fetchData();
    },[]);

  return (
  <div className="flex flex-col ">
      <Navbar></Navbar>

      <div className="bg-bgDark2 min-h-screen">

      <Filter filterData={filterData} category = {category} setCategory = {setCategory}></Filter>

      {/* <Cards courses = {courses}></Cards> */}

      <div className="w-11/12 max-w-[1200px]  mx-auto flex flex-wrap items-center justify-center">
        {
          loading ? (<Spiner></Spiner>) :(<Cards courses={courses} category = {category}></Cards>)
        }
      </div>
      </div>

  </div>
  );
};

export default App;

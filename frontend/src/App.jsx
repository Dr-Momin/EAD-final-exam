import './App.css'
import AddRecipe from "./components/AddRecipe.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [dbData, setDbData] = useState([]);

    useEffect( async  () => {
        try {
            const res = await axios.get('http://localhost:3000/api/ ', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            const data = await res.data;
            setDbData(data);
            console.log(data);

        } catch (e) {
            console.log(e, "error");
        }
    }, []);

    return (
        <div className={"App"}>




            <table className="table table-stripped text-center mt-5 ">
                <thead>
                <tr className="table-dark">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Ingredients</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>

                {
                    dbData?.map((item) => (
                        <>
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.ingredients}</td>



                                <td>
                                    <a href="" className="text-success">
                                        <i className="fas fa-edit fa-xl mx-1"></i>
                                    </a>
                                    <a href="" className="text-danger">
                                        <i className="fas fa-trash fa-xl mx-1"></i>
                                    </a>
                                </td>


                            </tr>
                        </>
                    ))
                }







                </tbody>

            </table>


            <AddRecipe/>

        </div>
)
}

export default App

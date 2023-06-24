import axios from "axios";
import {useEffect, useState} from "react";


const AddRecipe = () => {




    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        image: "",
    });


    const data = new FormData();


    const handleChange = (e) => {
        setFormData((prevState) => {
            if (e.target.name === "image") {
                return {
                    ...prevState,
                    [e.target.name]: e.target.files[0],
                };
            }
            else{
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                };
            }
        });
        data.append(e.target.name, e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            axios.post('http://localhost:3000/api/',formData , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                console.log(res);
                console.log("Form Submitted Successfully");
            })


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h2>Add Your Recipe</h2>

            <form
                action="/" method={"post"}
                encType='multipart/form-data'
                onSubmit={handleSubmit}
            >
                <label htmlFor="title">Title</label><br/>
                <input type="text" name="title" id="title" required
                       onChange={handleChange}
                /><br/>

                <label htmlFor="description">Description</label><br/>
                <textarea name="description" id="description" cols="30" rows="5" required
                    onChange={handleChange}
                ></textarea><br/>

                <label htmlFor="ingredients">Ingredients</label><br/>
                <textarea name="ingredients" id="ingredients" cols="30" rows="5" required
                    onChange={handleChange}
                ></textarea><br/>

                <label htmlFor="instructions">Instructions</label><br/>
                <textarea name="instructions" id="instructions" cols="30" rows="5" required
                    onChange={handleChange}
                ></textarea><br/>

                <label htmlFor="image">Image</label><br/>
                <input type="file" name="image" id="image" required
                    onChange={handleChange}
                /> <br/><br/>

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;


// const data = new FormData();
// data.append("file", image);

import React,{useState} from "react";
import axios from "axios"; // FOR MAKING HTTP REQUESTS

const ItemForm = ()=>{
    // state to hold the form data
    const [formData, setFormData] = useState({
        title : "",
        description : "",
        status : "LOST", // default status
        location : "",
        imageUrl : ""
    });

    // state to manage loading and messages
    const [message, setMessage] = useState('');

    // Function to update state when user types in an input field
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => (
            {
                ...prevState,
                [name] : value
            }
        ));

    };

    // Function to handle the form submission
    const handleSubmit = async (e) =>{
        e.preventDefault(); // prevent default browser submission
        setMessage("Submitting...");

        try{
            /* MAKE A POST REQUEST TO OUR SPRING BOOT BACKEND 
            IMPORTANT : use the port your springboot app is running on */
            const response = await axios.post('http://localhost:8081/api/posts', formData);

            console.log('Success', response.data);
            setMessage("Item Posted Successfully");

            // OPTIONALLY RESET THE FORM

            setFormData({
                title : "",
                description : "",
                status : "LOST",
                location : "",
                imageUrl:""
            })
        }catch(error){
            console.error("Error posting item : ", error);
            setMessage("Failed to post item. Please check the console")
        }
    }


    return(
        <div style={{maxWidth : '500px', margin :'2rem auto', padding : '1rem', border: '1px solid #ccc', borderRadius : '8px'}}>
            <h2 style={{fontFamily : "cursive"}}>Report a Lost or Found Item</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom : '1rem'}}>
                    <label >Title : </label> <br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{width : '100%', padding:'8px', boxSizing : 'border-box'}}/>
                </div>
                <div style={{marginBottom : '1rem'}}>
                    <label >Description :</label><br />
                    <textarea name="description" value={formData.description} onChange={handleChange} required style={{width : '100%', padding:'8px', boxSizing : "border-box"}}></textarea>
                </div>
                <div style={{marginBottom : '1rem'}}>
                    <label >Status : </label> <br />
                    <select name="status" value={formData.status} onChange={handleChange} style={{width : '100%', padding:'8px', boxSizing:'border-box'}}>
                        <option value="LOST">Lost</option>
                        <option value="FOUND">Found</option>
                    </select>
                </div>
                <div style={{marginBottom : '1rem'}}>
                    <label >Location : </label> <br />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{width : '100%', padding:'8px', boxSizing:"border-box"}}/>
                </div>
                <div style={{marginBottom : '1rem'}}>
                    <label>Image URL</label> <br />
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={{width : '100%', padding:'8px', boxSizing: "border-box"}}/>
                </div>
                <button type="submit" style={{padding : '10px 15px', cursor : 'pointer'}}>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )

}

export default ItemForm;
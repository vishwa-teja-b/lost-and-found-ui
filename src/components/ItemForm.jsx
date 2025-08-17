import React,{useState} from "react";
import axios from "axios"; // FOR MAKING HTTP REQUESTS


const ItemForm = ()=>{
    // state to hold the form data
    const [formData, setFormData] = useState({
        title : "",
        description : "",
        status : "LOST", // default status
        location : "",
    });

    const [imageFile, setImageFile] = useState(null); // state for the selected image file
    const [message, setMessage] = useState('');     // state to manage loading and messages
    const [isLoading, setIsLoading] = useState(false);

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

    // handler for file input
    const handleImageChange = (e)=>{
        if(e.target.files[0]){
            setImageFile(e.target.files[0]);
        }
    }

    // Function to handle the form submission
    const handleSubmit = async (e) =>{
        e.preventDefault(); // prevent default browser submission
        if(!imageFile){
            setMessage("Please select an image.");
            return;
        }
        setIsLoading(true);
        setMessage("Uploading image to Cloudinary...");

        // STEP 1 ) CREATE A FORMDATA OBJECT TO SEND TO CLOUDINARY
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", imageFile);
        cloudinaryFormData.append("upload_preset",'lost_and_found');
        cloudinaryFormData.append("folder", "lost_and_found_network");

        try{

            // STEP 2) SEND THE IMAGE DIRECTLY TO CLOUDINARY API

            const cloudinaryRes= await axios.post(
                'https://api.cloudinary.com/v1_1/dk07mnsa7/image/upload',
                cloudinaryFormData
            );

            console.log("CLOUDINARY RESPONSE : ",cloudinaryRes);

            const imageUrl = cloudinaryRes.data.secure_url;
            setMessage("Image uploaded. Submiting post to our server......");

            //3. Create final form data with the new image URL for our backend
            const completePostData = {
                ...formData,
                imageUrl : imageUrl // URL FROM CLOUDINARY
            }

            // 4. send everything to backend

            /* MAKE A POST REQUEST TO OUR SPRING BOOT BACKEND 
            IMPORTANT : use the port your springboot app is running on */
            const response = await axios.post('http://localhost:8081/api/posts', completePostData);

            console.log('Success', response.data);
            setMessage("Item Posted Successfully");

            // OPTIONALLY RESET THE FORM

            setFormData({
                title : "",
                description : "",
                status : "LOST",
                location : "",
            })

            setImageFile(null);

            document.getElementById('image-input').value=null; // clear file input

        }catch(error){
            console.error("Error posting item : ", error);
            setMessage("Failed to post item. Please check the console")
        }
        finally{
            setIsLoading(false);
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
                <div style={{marginBottom : "1rem"}}>
                    {/** this is the new file input */}
                    <label>Upload Image : </label>
                    <input id = "image-input" type="file" onChange={handleImageChange} accept="image/*" required style={{width : '100%', padding:'8px', boxSizing:"border-box"}}/>
                </div>
                <button type="submit" disabled={isLoading} style={{padding : '10px 15px', cursor : 'pointer'}}>{isLoading ? "Submitting..." : "Submit"}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )

}

export default ItemForm;
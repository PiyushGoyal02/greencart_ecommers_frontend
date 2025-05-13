import { useState } from "react";
import "../AdminSectionCSS/AdminSideAddproductsCSS.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";

function AdminSideAddproducts() {
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        productName: "",
        descriptionText: "",
        productprice: "",
        productsquantity: "",
        category: "",
        productImage: null
    });

    /*To display the image on the UI, we first need to check whether the image
     `is present or not. Initially, the value will be `null`,
      which means the image is not yet displayed on the UI.
    const [imagePreview, setImagePreview] = useState(null); */
    const [imagePreview, setImagePreview] = useState(null);

    // Form data onChange Value
    function formChangeHandler(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // It's a function for image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);  // This line use for see my fileSystem/imageURL It's craete a temporary URL
            setImagePreview(imageUrl);
            setFormData((prev) => ({
                ...prev,
                productImage: file
            }));
        }
    };

    // This is for remove image Cross button
    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData((prev) => ({
            ...prev,
            productImage: null
        }));
    };

    // This is for submit the form on backend APIs call
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (!formData.productName || !formData.productprice || !formData.productImage) {
            toast.error("Please fill all required fields!");
            return;
        }
        
        // this is create a new data 
        const data = new FormData();
        data.append("productName", formData.productName);  // append function (this is for add vlaue/value jodna)
        data.append("descriptionText", formData.descriptionText);
        data.append("productprice", formData.productprice);
        data.append("productsquantity", formData.productsquantity);
        data.append("category", formData.category);
        data.append("productImage", formData.productImage); // Fixed field name

        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/addproducts/addProducts",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log(response.data);
            toast.success("Your Product Successfully Added");
            setLoading(false)
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Your Product Was Not Added");
        }
    };

    return (
        <div>
            <div className="MainDivAddProducts">
                <p className="productsImages">Products Images</p>
                <form onSubmit={handleSubmit}>
                    <div className="singleImageBox">
                        {!imagePreview ? (
                            <>
                                <label htmlFor="imageUpload">
                                    <IoCloudUploadOutline size={18} />
                                    <p className="Uploadtext">Upload</p>
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    name="productImage"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </>
                        ) : (
                            <div className="image-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="Uploaded Preview"
                                    className="previewImage"
                                />
                                <RxCrossCircled
                                    className="removeBtnImage"
                                    onClick={handleRemoveImage}
                                />
                            </div>
                        )}
                    </div>

                    <div className="LabelInputDiv">
                        <label className="labelText">Products Name</label>
                        <input
                            type="text"
                            name="productName"
                            className="ProductsName"
                            placeholder="Type here"
                            value={formData.productName}
                            onChange={formChangeHandler}
                        />
                    </div>

                    <div className="LabelInputDiv">
                        <label className="labelText">Description</label>
                        <input
                            type="text"
                            name="descriptionText"
                            className="DescriptionText"
                            placeholder="Type here"
                            value={formData.descriptionText}
                            onChange={formChangeHandler}
                        />
                    </div>

                    <div className="LabelInputDiv">
                        <label className="labelText">Category</label>
                        <select
                            name="category"
                            className="OptionSection"
                            value={formData.category}
                            onChange={formChangeHandler}
                        >
                            <option value="">Choose an option</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="dairy">Dairy</option>
                            <option value="bakery">Bakery items</option>
                            <option value="softDrink">Soft Drink</option>
                            <option value="Gernal">Gernal</option>
                        </select>
                    </div>

                    <div className="Productsprice-Productsquantity-MainDiv">
                        <div className="LabelInputDiv">
                            <label className="labelText" htmlFor="price">
                                Product Price
                            </label>
                            <input
                                id="price"
                                type="text"
                                name="productprice"
                                className="ProdcutsPrice"
                                value={formData.productprice}
                                onChange={formChangeHandler}
                            />
                        </div>

                        <div className="LabelInputDiv">
                            <label className="labelText" htmlFor="quantity">
                                Product Quantity
                            </label>
                            <input
                                type="text"
                                id="quantity"
                                name="productsquantity"
                                className="ProductsQuantity"
                                value={formData.productsquantity}
                                onChange={formChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="buttonDiv">
                        <button className="AddButton" type="submit">
                            {loading === true ? "Loading.." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSideAddproducts;
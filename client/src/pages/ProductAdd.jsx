import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    ProductName:'',
    Brand: '',
    color: '',
    Quantity: '',
    Category: '',
    Type: '',
    size: '',
    Description: '',
    Price: '',
    URL: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear all errors on input change
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
  }));
};

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    if (!state.ProductName) {
      newErrors.ProductName = "Product Name is required";
    }
    if (!state.Brand) {
      newErrors.Brand = "Brand is required";
    }
    if (!state.color) {
      newErrors.color = "Color is required";
    }
    if (!state.Quantity) {
      newErrors.Quantity = "Quantity is required";
    }
    if (!state.Category) {
      newErrors.Category = "Category is required";
    }
    if (!state.Type) {
      newErrors.Type = "Type is required";
    }
    if (!state.size) {
      newErrors.size = "Size is required";
    }
    if (!state.Description) {
      newErrors.Description = "Description is required";
    }
    if (!state.Price) {
      newErrors.Price = "Price is required";
    }
    if (!state.URL) {
      newErrors.URL = "URL is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { ProductName, Brand, color, Quantity, Category, Type, size, Description, Price, URL} = state;
      const data = {
        ProductName,
        Brand,
        color,
        Quantity,
        Category,
        Type,
        size,
        Description,
        Price,
        URL
      };
      axios.post("http://localhost:3030/product/save", data)
      .then((res) => {
        if (res.data.success) {
          alert("Product Added Successfully");
          setState({
            ProductName:'',
            Brand: '',
            color: '',
            Quantity: '',
            Category: '',
            Type: '',
            size: '',
            Description: '',
            Price: '',
            URL: ''
            
          });
          navigate('/plist');
        }
      })
    }
  };

  return (
     
  <div className="min-w-0 flex-1 ">
  <br></br>
  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-10 flex justify-center">
  Add New Products
 </h2>

<div className="mx-auto max-auto px-8  ">
  <form >
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label htmlFor="product name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        <input
            type="text"
            id="ProductName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="ProductName"
            placeholder="ProductName"
            value={state.ProductName}
            onChange={handleInputChange}
            required
          />
          {errors.ProductName && <p className="text-red-500">{errors.ProductName}</p>}
      </div>
      <div>
        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
        <input
            type="text"
            id="Brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Brand"
            placeholder="brand"
            value={state.Brand}
            onChange={handleInputChange}
            required
          />
          {errors.Brand && <p className="text-red-500">{errors.Brand}</p>}
      </div>
      <div>
        <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colour</label>
        <input
            type="text"
            id="color"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="color"
            placeholder="color"
            value={state.color}
            onChange={handleInputChange}
            required
          />
          {errors.color && <p className="text-red-500">{errors.color}</p>}
      </div>
      <div>
        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        <input
            type="number"
            id="Quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Quantity"
            placeholder="quantity"
            value={state.Quantity}
            onChange={handleInputChange}
            required
          />
          {errors.Quantity && <p className="text-red-500">{errors.Quantity}</p>}
      </div>
      <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <select
            type="text"
            id="Category"
            placeholder="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Category"
            value={state.Category}
            onChange={handleInputChange}
            required>
          <option value="Men">Men</option>
          <option value="Woman">Woman</option>

         </select> 
          {errors.Category && <p className="text-red-500">{errors.Category}</p>}
      </div>
      <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Garment Type</label>
        <select
            type="text"
            id="Type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Type"
            value={state.Type}
            onChange={handleInputChange}
            required>
          <option value="Top">Top</option>
          <option value="Lower">Lower</option>

        </select>
          {errors.Type && <p className="text-red-500">{errors.Type}</p>}
      </div>
      <div>
          <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size </label>
         <select 
          name="size"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={state.size} 
          onChange={handleInputChange} required>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
   

        </select>
          {errors.size && <p className="text-red-500">{errors.size}</p>}
     </div>
     <div>
        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input
            type="number"
            id="Price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Price"
            placeholder="price"
            value={state.Price}
            onChange={handleInputChange}
            required
          />
          {errors.Price && <p className="text-red-500">{errors.Price}</p>}
      </div>

    </div>

    <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="Description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            name="Description"
            placeholder="Enter Product  Details here"
            value={state.Description}
            onChange={handleInputChange} required></textarea>
            {errors.Description && <p className="text-red-500">{errors.Description}</p>}
     </div>
    <div className="mb-6">
      <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture URL</label>
      <input
            type="text"
            id="URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="URL"
            placeholder="picture url"
            value={state.URL}
            onChange={handleInputChange}
            required
          />
          {errors.URL && <p className="text-red-500">{errors.URL}</p>}
    </div>

    <div className="flex justify-center">
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  onClick={onSubmit}>Submit</button>
    </div>


  </form>
  </div>
  <br></br>
</div>
    )
  }

  export default ProductAdd;


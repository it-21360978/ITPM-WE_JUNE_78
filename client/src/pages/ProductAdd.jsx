import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const ProductAdd = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    StudentId: '',
    subject: '',
    issueDate: '',
    details: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear specific error message
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: ''
  }));
};

  const validateForm = () => {
    const newErrors = {};
  
    // Validate StudentId
    if (!state.StudentId) {
      newErrors.StudentId = "Student Id is required";
    }
  
    // Validate subject
    if (!state.subject) {
      newErrors.subject = "Subject is required";
    }
  
    // Validate issueDate
    if (!state.issueDate) {
      newErrors.issueDate = "Issue Date is required";
    }
  
    // Validate details
    if (!state.details) {
      newErrors.details = "Details are required";
    }
  
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    const { StudentId, subject, issueDate, details } = state;
    const data = {
      StudentId,
      subject,
      issueDate,
      details
    };
    axios.post('http://localhost:9090/ticket/save', data)
      .then((res) => {
        if (res.data.success) {
          alert("Ticket Added Successfully");
          setState({
            StudentId: '',
            subject: '',
            issueDate: '',
            details: ''
            
          });
          navigate('/Stickets');
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
  <form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label htmlFor="product name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        <input
            type="text"
            id="StudentId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="StudentId"
            placeholder="Enter Student id"
            value={state.StudentId}
            onChange={handleInputChange}
            required
          />
          {errors.StudentId && <p className="text-red-500">{errors.StudentId}</p>}
      </div>
      <div>
        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
        <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="brand" required />
      </div>
      <div>
        <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colour</label>
        <input type="text" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="color" required />
      </div>
      <div>
        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        <input type="text" id="quentity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="quantity"  required />
      </div>
      <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <input type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="men/woman/child" required />
      </div>
      <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
        <input type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="upper/lower" required />
      </div>
      <div>
<label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size </label>
<select id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  <option value="s">S</option>
  <option value="m">M</option>
  <option value="l">L</option>
  <option value="xl">XL</option>

</select>
</div>

    </div>

    <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product information here" required />
     </div>
    <div className="mb-6">
      <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture URL</label>
      <input type="url" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
    </div>

    <div className="flex justify-center">
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Submit
</button>
    </div>


  </form>
  </div>
  <br></br>
</div>
    )
  }

  export default ProductAdd;
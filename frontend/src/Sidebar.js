import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBIcon, MDBCollapse, MDBRipple, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import Images from './Images/logo.png';
import Welcome from './Welcome';

function AddCategoryForm({ handleSubmit, handleChange, category }) {
  return (
    <form onSubmit={handleSubmit}>
      <label className="add-category-label">Add Category</label>
      <div className="category-div">
        <div className="category-first">
          <label>Name</label>
          <input
            type="text"
            name="category_name"
            value={category.category_name}
            onChange={handleChange}
            placeholder="Category Name"
            className="form-control mr-2"
          />
        </div>
        <div className="category-first">
          <label>Description</label>
          <input
            type="text"
            name="category_description"
            value={category.category_description}
            onChange={handleChange}
            placeholder="Category Description"
            className="form-control mr-2"
          />
        </div>
        <div className="category-first">
          <label>Status</label>
          <select
            name="category_status"
            value={category.category_status}
            onChange={handleChange}
            className="form-control mr-2"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div className="d-flex mt-2 button-div">
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
          <a href=''><button type="submit" className="btn btn-primary">Save</button></a>
        </div>
      </div>
    </form>
  );
}

function CategoryList({ categories }) {
  return (
    <div className='get-category'>
      <h2>Category List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id} className='li-tag'>
            <strong >ID:</strong> {category.id}, <strong className='strong-tag'>Name:</strong> {category.category_name}, <strong className='strong-tag-desc'>Description:</strong> {category.category_description}, <strong className='strong-tag'>Status:</strong> {category.category_status}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sidebar() {
  const [currentPage, setCurrentPage] = useState("home");
  const [category, setCategory] = useState({
    category_name: '',
    category_description: '',
    category_status: '1'
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend when component mounts
    axios.get('http://localhost:8081/category/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleItemClick = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/category/add', category);
      console.log(response.data.message);
      // Clear form fields after successful submission
      setCategory({
        category_name: '',
        category_description: '',
        category_status: '1'
      });
      window.location.reload();
      setCurrentPage("category");
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <div>
          <img src={Images} className='logo-home' alt="My Image" style={{ width: '200px', height: '150px' }} />
          <label className='home-label'>Welcome to Digitalflake Admin</label>
        </div>;
      case "category":
        return <><AddCategoryForm handleSubmit={handleSubmit} handleChange={handleChange} category={category} /><CategoryList categories={categories} /></>;
      case "products":
        return <div>Products Content Goes Here</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <MDBCollapse tag="nav" className="d-lg-block bg-white sidebar">
        <div className="position-sticky ">
          <MDBListGroup className="mx-3 mt-4 ">

            <MDBRipple rippleTag='span' onClick={() => handleItemClick("home")}>
              <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                <MDBIcon fas icon="lock me-3" />
                Home
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag='span' onClick={() => handleItemClick("category")}>
              <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                <MDBIcon fas icon="chart-line me-3" />
                Category
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag='span' onClick={() => handleItemClick("products")}>
              <MDBListGroupItem tag='a' href='#' action className='border-0 border-bottom rounded'>
                <MDBIcon fas icon="chart-pie me-3" />
                Products
              </MDBListGroupItem>
            </MDBRipple>

          </MDBListGroup>
        </div>
      </MDBCollapse>
      <div className="content">
        {renderContent()}
      </div>

    </>
  );
}

export default Sidebar;

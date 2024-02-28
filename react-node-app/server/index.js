// server/index.js

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'login'
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Swagger definition
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Your API Documentation',
//       version: '1.0.0',
//       description: 'Documentation for your API endpoints',
//     },
//     servers: [
//       {
//         url: 'http://localhost:8081',
//         description: 'Development server',
//       },
//     ],
//   },
//   apis: ['./server/index.js'], // Path to the API files
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.post('/login', (req,res) => {
//   const sql = "SELECT * FROM users WHERE email = ? AND pass = ?";
  
//   connection.query(sql,[req.body.email,req.body.password],(err,data) => {
//     if (err) {
//       return res.status(500).json("Error");
//     }
//     if (data.length > 0) {
//       return res.status(200).json("Login Successfully");
//     } else {
//       return res.status(401).json("No Record Found");
//     }
//   })
// })


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  // Check if the email and password match a record in the database
  const sql = "SELECT * FROM users WHERE email = ? AND pass = ?";
  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error checking credentials:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    // If email and password are correct, you can implement further actions here
    // For example, you can generate a JWT token for authentication

    return res.status(200).json({ success: true, message: 'Login successful' });
  });
});

// Get all Products API
app.get('/products/', (req, res) => {
  const sql = "SELECT * FROM product";
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving product:', err);
      return res.status(500).json({ error: 'Error retrieving product' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(result);
  });
});

// Get Product by ID API
app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const sql = "SELECT * FROM product WHERE id = ?";
  
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error retrieving product:', err);
      return res.status(500).json({ error: 'Error retrieving product' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(result[0]);
  });
});

// Add Product API
app.post('/products/add', (req, res) => {
  const { id, product_name, pack_size, category, mrp, image, status } = req.body;
  if (!id || !product_name) {
    return res.status(400).json({ error: 'Please provide both id and product_name' });
  }

  const sql = "INSERT INTO login.product (id, product_name, pack_size, category, mrp, image, status) VALUES (?, ? , ?, ?, ?, ?, ?)";
  
  connection.query(sql, [id, product_name, pack_size, category, mrp, image, status], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Error adding product' });
    }
    return res.json({ message: 'Product added successfully' });
  });
});

// Update Product API
app.put('/products/update/:id', (req, res) => {
  const id = req.params.id;
  const { product_name, pack_size, category, mrp, image, status} = req.body;
  
  if (!product_name) {
    return res.status(400).json({ error: 'Please provide product_name' });
  }

  const sql = "UPDATE login.product SET product_name = ?, pack_size= ?, category = ?, mrp = ?, image = ?, status = ? WHERE id = ?";
  
  connection.query(sql, [product_name, pack_size, category, mrp, image, status, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Error updating product' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ message: 'Product updated successfully' });
  });
});

// Delete Product API
app.delete('/products/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login.product WHERE id = ?";
  
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Error deleting product' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ message: 'Product deleted successfully' });
  });
});



//get all category
app.get('/category/', (req, res) => {
  const sql = "SELECT * FROM category";
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving category:', err);
      return res.status(500).json({ error: 'Error retrieving category' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'category not found' });
    }
    return res.json(result);
  });
});

// Get Category by ID API
app.get('/category/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM category WHERE id = ?";
  
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error retrieving category:', err);
      return res.status(500).json({ error: 'Error retrieving category' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'category not found' });
    }
    return res.json(result[0]);
  });
});

// Add category API
// app.post('/category/add', (req, res) => {
//   const { id, category_name, category_description,category_status } = req.body;
//   if (!id || !category_name) {
//     return res.status(400).json({ error: 'Please provide both id and category_name' });
//   }

//   const sql = "INSERT INTO login.category (id, category_name,category_description,category_status) VALUES (?, ?,?,?)";
  
//   connection.query(sql, [id, category_name,category_description,category_status], (err, result) => {
//     if (err) {
//       console.error('Error adding category:', err);
//       return res.status(500).json({ error: 'Error adding category' });
//     }
//     return res.json({ message: 'category added successfully' });
//   });
// });


// Add category API
app.post('/category/add', (req, res) => {
  const { category_name, category_description, category_status } = req.body;
  if (!category_name) {
    return res.status(400).json({ error: 'Please provide category_name' });
  }

  const sql = "INSERT INTO login.category (category_name, category_description, category_status) VALUES (?, ?, ?)";
  
  connection.query(sql, [category_name, category_description, category_status], (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      return res.status(500).json({ error: 'Error adding category' });
    }
    return res.json({ message: 'category added successfully' });
  });
});


// Update Category API
app.put('/category/update/:id', (req, res) => {
  const id = req.params.id;
  const { category_name,category_description,category_status } = req.body;
  
  if (!category_name) {
    return res.status(400).json({ error: 'Please provide category_name' });
  }

  
  const sql = "UPDATE login.category SET category_name = ?, category_description = ?, category_status = ? WHERE id = ?";

  
  connection.query(sql, [category_name,category_description,category_status, id], (err, result) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ error: 'Error updating category' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'category not found' });
    }
    return res.json({ message: 'category updated successfully' });
  });
});

// Delete category API
app.delete('/category/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login.category WHERE id = ?";
  
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ error: 'Error deleting category' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'category not found' });
    }
    return res.json({ message: 'category deleted successfully' });
  });
});


// Add User API
app.post('/signup/', (req, res) => {
  const {  email, pass } = req.body;
  if ( !email) {
    return res.status(400).json({ error: 'Please provide both id and email' });
  }

  const sql = "INSERT INTO login.users ( email, pass) VALUES ( ?, ?)";
  
  connection.query(sql, [ email, pass], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Error adding user' });
    }
    return res.json({ message: 'user added successfully' });
  });
});

// API endpoint for forgot password
app.post('/forgotpassword', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Please provide an email address' });
  }

  // Check if the email exists in the database
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // If the email exists, you can send a reset link to the user's email here
    // Implement your logic to send the reset link via email

    // For demonstration purposes, we'll just return a success message
    return res.json({ success: true, message: 'Reset link sent to email' });
  });
});

app.listen(8081, () => {
  console.log("Listening...");
})


import Product from '../models/Product.js'; // Assuming you have a Product model


export const createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  // Get the uploaded image URL (Multer sets `req.file`)
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image: imageUrl, // Store image URL
      slug: name.toLowerCase().replace(/\s+/g, '-'), // Example slug generation
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category, minPrice, maxPrice } = req.query;

    // Calculate the skip for pagination
    const skip = (page - 1) * limit;

    // Build the query object with search and filtering options
    const query = {
      status: true, // Ensure we're only getting active products
      name: { $regex: search, $options: 'i' }, // Search by name, case-insensitive
      ...(category && { category }), // Filter by category if provided
      ...(minPrice && { price: { $gte: minPrice } }), // Filter by min price
      ...(maxPrice && { price: { $lte: maxPrice } }), // Filter by max price
    };

    // Fetch the filtered and paginated products and populate the category field
    const products = await Product.find(query)
      .populate('category') // Populate the category field (replace 'category' with the appropriate field name)
      .skip(skip)
      .limit(Number(limit)) // Ensure limit is a number
      .exec();

    // Get the total count of products matching the query
    const totalProducts = await Product.countDocuments(query);

    // Return the response with pagination and filtering info
    res.status(200).json({
      totalItems: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      items: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};


export const updateProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  const updatedImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image: updatedImageUrl || undefined, // Update image if provided
        slug: name.toLowerCase().replace(/\s+/g, '-'), // Update slug as well
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Soft delete by updating the 'status' field
    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },  // Set status to false for soft delete
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product soft deleted successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the 'status' field from 0 to 1
    const product = await Product.findByIdAndUpdate(
      id,
      { status: 1 },  // Set status to 1 (active)
      { new: true }   // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product restored successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error restoring product' });
  }
};




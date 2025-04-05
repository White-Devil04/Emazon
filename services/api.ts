// fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => console.log(data));

export const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
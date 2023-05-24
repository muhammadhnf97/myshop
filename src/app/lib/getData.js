export async function getProduct() {
    try {
      const res = await fetch(`http://localhost:5000/product`);
      const data = await res.json()
      return data;
    } catch (error) {
      return error
    }
  }
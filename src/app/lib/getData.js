export async function getProduct() {
  try {
    const res = await fetch(`/db.json`);
    const data = await res.json()
    return data;
  } catch (error) {
    return error
  }
}


export async function searchProduct(filter, konsol=null) {
  try {
    const res = await fetch(`http://localhost:5000/product?q=${filter}${konsol !== null ? `&&konsol=${konsol}` : ''}`);
    const data = await res.json()
    return data;
  } catch (error) {
    return error
  }
}
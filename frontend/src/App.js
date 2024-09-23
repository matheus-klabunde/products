import { useEffect, useState } from 'react';
import './App.css';
import Form from './form';
import Table from './table';

function App() {

  // Product Object
  const product = {
    code: 0,
    name: '',
    brand: ''
  }

  // useState
  const [btnRegister, setBtnRegister] = useState(true);
  const [products, setProducts] = useState([]);
  const [productObj, setProductObj] = useState(product);

  // useEffect
  useEffect(() => {
    fetch("http://localhost:8080/product/list")
      .then(response => response.json())
      .then(responseJson => setProducts(responseJson));
  }, []);

  // Get data form
  const typing = (e) => {
    setProductObj({ ...productObj, [e.target.name]: e.target.value })
  }

  // Register Product
  const register = () => {
    fetch("http://localhost:8080/product", {
      method: 'post',
      body: JSON.stringify(productObj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.message) {
          alert(responseJson.message);
        } else {
          setProducts([...products, responseJson]);
          alert("Product registered successfully!");
          clearForm();
        }
      })
  }

  // Update Product
  const update = () => {
    fetch("http://localhost:8080/product", {
      method: 'put',
      body: JSON.stringify(productObj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.message) {
          alert(responseJson.message);
        } else {
          alert("Product updated successfully!");
          let tempVector = [...products];
          let index = tempVector.findIndex((p) => {
            return p.code === productObj.code;
          });
          tempVector[index] = productObj;
          setProducts(tempVector);
          clearForm();
        }
      })
  }

  // Remove Product
  const remove = () => {
    fetch("http://localhost:8080/product/" + productObj.code, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        alert(responseJson.message);
        let tempVector = [...products];
        let index = tempVector.findIndex((p) => {
          return p.code === productObj.code;
        });
        tempVector.splice(index, 1);
        setProducts(tempVector);
        clearForm();
      })
  }

  // Clear Form
  const clearForm = () => {
    setProductObj(product);
    setBtnRegister(true);
  }

  // Select Product
  const selectProduct = (index) => {
    setProductObj(products[index]);
    setBtnRegister(false);
  }

  return (
    <div className="App">

      <Form button={btnRegister} keyboardEvent={typing} register={register} update={update} remove={remove} obj={productObj} cancel={clearForm} />
      <Table vector={products} select={selectProduct} />
    </div>
  );
}

export default App;

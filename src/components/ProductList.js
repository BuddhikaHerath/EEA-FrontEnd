import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';


class ProductList extends Component {
  constructor(props){
    super(props);
    this.state = {productsList:[]};
  }

  componentDidMount(){
    const that = this;
    fetch("http://localhost:8080/api/products")
    .then(function(res){
      return res.json();
    }).then(function(jsonData) {
      //console.log(jsonData[0]);
      that.setState({ productsList: jsonData });
     
  });

  
  }
  
  render() {
    //console.log(this.state.productsList,"kk");
    if(this.state.productsList.length!==0){
      return (
        <React.Fragment>
  
          <div className="py-5">
            <div className="container">
              <Title name="Our" title="products" />
                
                <div className="row">
  
                  {
                    
                     this.state.productsList.map((product)=>{
                      return <Product key = {product.id} product ={product} />
                    })
                  }
                </div>
            </div>
          </div>
  
        </React.Fragment>
        
      );
    }else{
      return <div></div>;
    }
   
  }
}

export default ProductList;

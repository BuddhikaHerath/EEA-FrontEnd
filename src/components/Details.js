import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button'


class Details extends Component {
  constructor(props){
    super(props);
    this.state={
      prodId : this.props.location.state.prodId,
      description:"",
      title:"",
      quantity:"",
      price:"",
      image:"",
      company:"",
      available:true
    };
    this.cartBtn = this.cartBtn.bind(this);
   // console.log("propd",this.state.prodId);
  }

  cartBtn(id){
    console.log("Cart btn : ",id);
    this.setState({available:!this.state.available});
  }

  componentDidMount(){
    const that = this;
    fetch("http://localhost:8080/api/products/"+this.state.prodId)
    .then(function(res){
      return res.json();
    }).then(function(jsonData) {
      console.log(jsonData);
      that.setState({
        description:jsonData["description"],
        title:jsonData["title"],
        quantity:jsonData["quantity"],
        price:jsonData["price"],
        image:jsonData["image"],
        company:jsonData["company"],
        
      });
      
      //that.setState({ productsList: jsonData });
      //return JSON.stringify(jsonData);
    });
    if(this.state.quantity>0){
      this.setState({available:true});
    }else{
      this.setState({available:false});
    }
  }
  
  render() {
    return (
      <div>
            <div className="container py-5">
              {/* tile */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{this.state.title}</h1>
                </div>
              </div>
              {/* end title */}

              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 ">
                  <img src={this.state.image} className="img-fluid" alt="product" />
                </div>
                {/* product text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model : {this.state.title}</h2>
                  <h4 className="text-title text-uppercase 
                  text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">
                       {this.state.company}
                    </span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price : <span>$</span>
                      {this.state.price}

                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product:
              </p>
                  <p className="text-muted lead">{this.state.description}</p>

                  {/* buttons */}
                  <div>
                    <Link to='/'>
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>

                    <ButtonContainer 
                    cart 
                    sdisabled={this.state.available}
                    onClick={( )=>  {
                      this.cartBtn(this.state.prodId)

                    }}>
                    {this.state.available? "inCart":"add to cart"}
                    </ButtonContainer>
                    {/* <ButtonContainer 
                    cart 
                    sdisabled={inCart ? true : false}
                    onClick={( )=>  {
                      value.addToCart(this.state.prodId)
                      value.openModal(this.state.prodId);

                    }}>
                      {inCart ? "inCart" : "add to cart"}
                    </ButtonContainer> */}
                  </div>

 

                </div>

              </div>


            </div>
          {/* )
        }} */}
      </div>
    )
  }
}

export default Details;

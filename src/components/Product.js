import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonContainer } from './Button';
const axios = require('axios');

 class Product extends  Component {
   constructor(props){
    
     super(props);
     this.state = {
       status:true,
       addToCart:false
      };
     this.openModelBtn = this.openModelBtn.bind(this);
   }

   openModelBtn=(id)=>{
      this.setState({status:false})
      const that = this;
      axios.post('http://localhost:8080/api/cart', {
        quantity: 1,
        product:{
          id:id
        }
      })
      .then(function (response) {
        console.log(response);
        that.setState({addToCart:!that.state.addToCart});
      })
      .catch(function (error) {
        console.log(error);
      });
      alert("Item was added to cart");
   }
   
  render() {
    // const {id, title, image, price , inCart} = this.props.product ;
    const {id, title, image, price } = this.props.product ;
    const {status}= this.state;
    console.log(status,"lllll")
    return (
      <ProductWrapper className = "col-9 mx-auto col-md-6 col-lg-3 my-3 ">
       {
          this.state.addToCart? <PopupProduct prodId={id}/>:""
        }
        <div className = "card">
       
          {/* {(value) => ( */}
        <div 
        className = "img-container p-5" 
        
       >
       <Link to={{ pathname: '/details', state: { prodId: id }}}>
        <img src = {image} alt = "product" className = "card-img-top"/>
        </Link>
      <button className = "cart-btn"
      onClick ={()=> {
        this.openModelBtn(id);
    }}
      >
       {status ? (

< i className = "fas fa-cart-plus"/> 
        ) : (  
<p className = "text-capitalize mb-0" disabled>{" "}
        in cart </p>
       )}
       </button>
        </div> 
{/* ) } */}

     



        {/*cart footer*/}
          <div className = "card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">
          {title}
          </p>
          <div className = "text-blue  font-italic mb-0">
          <span className ="mr-1">$</span>
          {price}

          </div>
          </div>

        </div>
       
       
      </ProductWrapper>
    )
  }
}

class PopupProduct extends React.Component{
  constructor(props){
    super(props);
    this.state={
      prodId:props.prodId,
      title:"",
      price:"",
      image:"",
      modelOpen:true
    };
    this.closeContainer = this.closeContainer.bind(this);
    console.log("poopup ",this.state.prodId);
  }

  componentDidMount(){
    const that = this;
    axios.get('http://localhost:8080/api/products/'+this.state.prodId)
      .then(function (response) {
        const jsonData = response.data;
        console.log(jsonData);
        that.setState({
          title:jsonData["title"],
          price:jsonData["price"],
          image:jsonData["image"]
        });
      })
      .catch(function (error) {
        console.log("error : ",error);
      });
  }

  closeContainer(){
    this.setState({modelOpen:false});
  }

  render(){
    
    if(this.state.modelOpen){
    return(
      <ModalContainer>
      <div className="container">
                <div className="row">
                   <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                    <h5>Item added to the cart </h5>
                    <img src={this.state.image} className="img-fluid" alt="product" />
                    <h5> {this.state.title}</h5>
                    <h5 className="text-muted"> price : $ {this.state.price}</h5>
                    <Link to='/'>
                      <ButtonContainer onClick={() => this.closeContainer()}>
                        store
                    </ButtonContainer>
                    </Link>

                    <Link to='/cart'>
                      <ButtonContainer cart  onClick={() => this.closeContainer()}>
                        go to cart
                    </ButtonContainer>
                    </Link>

                  </div>
                </div>
              </div>
              </ModalContainer>
    );
    }else{
      return(<div></div>);
    }
  }
}

export default Product;  

const ProductWrapper = styled.div `
.card{
  border-color:transparent;
  transition:all 1s linear;

}

.card-footer{
  background:transparent;
  border-top: tran sparent;
  transition: all is linear;
}

&:hover{
  .card{
    border:0.4rem solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
  }
  .card-footer{
    background:rgba(247,247,247);
  }

}

.img-container{
  position : relative;
  overflow: hidden;
}

.card-img-top{
  transition: all is linear;
}

.img-container:hover .card-img-top{
  transform: scale(1.2);

}

.cart-btn{
  position: absolute;
  bottom:0;
  right:0;
  padding:0.2rem 0.4rem;
  background:var(--lightBlue);
  border:none;
  color:var(--mainWhite);
  font-size: 1.4rem;
  border-radius:0.5rem 0 0 0;
  transform: translate(100%, 100%);
  transition: all is linear;
}

.img-container:hover .cart-btn{
  transform: translate(0, 0);
}

.cart-btn : hover{
  color:var{--mainBLue};
  cursor: pointer;
}
`;

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
Z-Index:1;
#modal{
  background:var(--mainWhite);
}


`;
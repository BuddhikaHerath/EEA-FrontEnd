import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns'
import EmptyCart from "./EmptyCart"
import CartTotals from './CartTotals'
import CartItem from './CartItem'
const axios = require('axios');



class Cart extends Component {
  constructor(props){
    super(props);
    this.state={
      orderProd:[],
      orderId:"",
      totalPrice:0
    }
    this.setTotalPrice = this.setTotalPrice.bind(this);
  }

  componentDidMount(){
    const that = this;
    axios.get('http://localhost:8080/api/cart')
      .then(function (response) {
        console.log("cart ",response);
        const data = response.data;
        const orderProdList = [];
        let totalPrice=0;
        data.map(item=>{
          const price = item.productDTO.price * item.quantity;
          console.log("price ,",price);
          totalPrice +=price;
          const newProduct = {
            orderId : item.ordersDTO.id,
            quantity : item.quantity,
            productId : item.productDTO.id,
            img : item.productDTO.image,
            price : item.productDTO.price,
            title : item.productDTO.title,
            total: price
          }
          orderProdList.push(newProduct);
          return newProduct;
          
        });
        
        console.log("order prod : ",totalPrice);
        that.setState({
          orderProd: orderProdList,
          totalPrice:totalPrice
        });
        
      })
      .catch(function (error) {
        console.log("cart error ",error);
      });
  }

  setTotalPrice(changePrice){
    changePrice = this.state.totalPrice + changePrice;
    this.setState({
      totalPrice:changePrice})
  }

  render() {
    
    //console.log("prod",this.state.orderProd.length);
    if(this.state.orderProd.length>0){
      return (
        <section>
          <div>
                  <React.Fragment>

                    <Title name="your" title="cart" />
                    <CartColumns />
                    {/* <CartList value={value}/> */}
                     <div className = "container-fluid">
                        {this.state.orderProd.map(item =>{
                          return <CartItem key = {item.productId} item={item} setTotalPrice={this.setTotalPrice} />
                        })}

                    </div> 
                    <CartTotals total={this.state.totalPrice} orderId={this.state.orderProd[0].orderId}/> 


                  </React.Fragment>
              

          </div>
        
        </section>
      )
    }else{
      return <EmptyCart />;
    }
  }
}

export default Cart;

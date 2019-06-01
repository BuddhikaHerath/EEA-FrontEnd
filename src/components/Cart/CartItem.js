import React from 'react';
import { Redirect,Link } from 'react-router-dom'
const axios = require("axios");



class CartItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            item:props.item,
            displayItem:true,
            errorMessage:""
        };
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
        this.removeItem = this.removeItem.bind(this);
        
    }
    
    decrement(){
        const orderProduct = this.state.item;
        console.log(orderProduct);
        const that = this;
        axios.put("http://localhost:8080/api/cart/"+orderProduct.orderId ,{
            product:{
                id: orderProduct.productId,
            },
            quantity:orderProduct.quantity-1
        })
        .then(function(res){
            console.log("res ",res);
            const data = res.data;
            console.log("data ",data);
            const prevPrice = orderProduct.total;
            orderProduct.quantity = data.quantity;
            orderProduct.total = data.quantity * orderProduct.price;
            //console.log("order ",orderProduct);
            that.setState({
                item:orderProduct,
            });
            that.props.setTotalPrice(orderProduct.total - prevPrice)
            that.setState({errorMessage:""})
        }).catch(function (error) {
            that.setState({errorMessage:"minimum is 1"})
            // handle error
            console.log("error ",error);
          })
        //console.log("item ",this.state.item);
    }
    
    increment(){
        const orderProduct = this.state.item;
        const that = this;
        axios.put("http://localhost:8080/api/cart/"+orderProduct.orderId ,{
            product:{
                id:orderProduct.productId
            },
            quantity:orderProduct.quantity+1
        })
        .then(function(res){
            const data = res.data;
            console.log(data);
            console.log("before ",orderProduct);
            const prevPrice = orderProduct.total;
            const prevTotal = orderProduct.total;
            orderProduct.quantity = data.quantity;
            orderProduct.total = data.quantity * orderProduct.price;
            const newTotal = orderProduct.total - prevTotal;
            console.log("order ",orderProduct);
            that.setState({
                item:orderProduct
            });
            that.props.setTotalPrice(orderProduct.total - prevPrice)
            that.setState({errorMessage:""})
        }).catch(function(error){
            that.setState({errorMessage:"reach to maximum"})
        });
    }

    removeItem(){
        const orderProduct = this.state.item;
        const that = this;
        axios.delete("http://localhost:8080/api/cart/"+orderProduct.orderId+"/"+orderProduct.productId)
        .then(function(res){
            // const data = res.data;
            // orderProduct.quantity = data.quantity;
            // orderProduct.total = data.quantity * orderProduct.price;
            //console.log("order ",orderProduct);
            if(res.data){
                that.setState({
                    displayItem:false
                }); 
            }
        });
        
    }

    componentDidUpdate(){
        if (!this.state.displayItem) {
            window.location.reload()
         }
    }

    render(){
        console.log("render ",this.state.item);
        return(
            <div className="row my-2 text-capitalize text-center">
                {/* <div>
                    {this.renderRedirect()}
                </div> */}
                <div className="col-10 mx-auto col-lg-2">
                    <img src={this.state.item.img} style={{ Width: '5rem', height: "5rem" }} className="img-fliud" alt="product" />
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-g-none">product:</span>
                    {this.state.item.title}
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">price:</span>
                    {this.state.item.price}
                </div>

                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <div>
                            <span className="btn btn-black mx-1" onClick={this.decrement}>
                                -
            </span>

                            <span className="btn btn-black mx-1">{this.state.item.quantity}</span>
                            <span className="btn btn-black mx-1" onClick={this.increment}>
                                +
            </span>
                        </div>
                    </div>
                    <p>{this.state.errorMessage}</p>
                </div>
                {/*  */}

                <div className="col-10 mx-auto col-lg-2">
                    <div className="cart-icon" onClick={this.removeItem}>
                    <i className="fas fa-trash"></i>
                    </div>
                
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <strong>item total : $ {this.state.item.total}</strong>
                    {/* {total} */}
                </div>

        </div>
        );
    }
}

export default CartItem;
// export default function CartItem({ item, value }) {
//     const { id, title, img, price, total, count } = item;
//     const { increment, decrement, removeItem } = value;

//     return (
//         <div className="row my-2 text-capitalize text-center">
//             <div className="col-10 mx-auto col-lg-2">
//                 <img src={img} style={{ Width: '5rem', height: "5rem" }} className="img-fliud" alt="product" />


//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-g-none">product:</span>
//                 {title}
//             </div>

//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-lg-none">price:</span>
//                 {price}
//             </div>

//             <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
//                 <div className="d-flex justify-content-center">
//                     <div>
//                         <span className="btn btn-black mx-1" onClick={() => this.decrement(id)}>
//                             -
//         </span>

//                         <span className="btn btn-black mx-1">{count}</span>
//                         <span className="btn btn-black mx-1" onClick={() => this.increment(id)}>
//                             +
//         </span>
//                     </div>
//                 </div>
//             </div>
//             {/*  */}

//             <div className="col-10 mx-auto col-lg-2">
//                 <div className="cart-icon" onClick={()=>removeItem(id)}>
//                 <i className="fas fa-trash"></i>
//                 </div>
               
//             </div>

//             <div className="col-10 mx-auto col-lg-2">
//                 <strong>item total : $ {total}</strong>
//                 {/* {total} */}
//             </div>

//         </div>
//     )
// }

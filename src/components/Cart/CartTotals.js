import React from 'react'
import { Redirect } from 'react-router-dom'
import PayPalButton from './PayPalButton'
const axios = require("axios");

class CartTotals extends React.Component{
    constructor(props){
        super(props);
        this.state={
            totalPrice:props.total,
            orderId:props.orderId,
            cartStatus:true
        };
        console.log("total price ",this.state.totalPrice);
        console.log(this.state.orderId);
        this.clearCart = this.clearCart.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            totalPrice:props.total
        })
    }

    updateTotal(){
        window.location.reload();
    }

    clearCart(){
        const that = this;
        axios.delete("http://localhost:8080/api/cart/"+this.state.orderId)
        .then(function(res){
            
            if(res.data){
                that.setState({
                    cartStatus:false
                })
            }
        });
    }
    
    render(){
        if(this.state.cartStatus){
            return(
                <React.Fragment>
                    {/* {
                        this.redirectPage()
                    } */}
                    <div className="container">
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                            {/* <Link to="/"> */}
                                <button className="btn btn-outline-danger text-uppercase mb-3 px-5 " type="button"
                                    onClick={this.clearCart}>
                                    clear cart
                                </button>
                            {/* </Link> */}
                            <h5>
                                <span className="text-title">
                                    subtotal :  </span>
                                <strong>$ {this.state.totalPrice}</strong>
                            </h5>

                            {/* <h5>
                                <span className="text-title">
                                    tax :  </span>
                                <strong>$ {cartTax}</strong>
                            </h5> */}

                            <h5>
                                <span className="text-title">
                                    total :  </span>
                                <strong>$ {this.state.totalPrice}</strong>
                            </h5>
                            <PayPalButton
                            total={this.state.totalPrice}
                            orderId={this.state.orderId}/>
                        </div>
                    </div>
                    </div>
                </React.Fragment>
            );
        }else{
            return(
                <Redirect to="/"/>
            )
        }
    }
}
export default CartTotals;
// export default function CartTotals({ value,history }) {
//     const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

//     return (
//         <React.Fragment>
            
//         </React.Fragment>
//             )
//         }

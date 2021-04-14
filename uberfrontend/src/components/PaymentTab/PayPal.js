import React, { useState, useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const [totalPrice, setTotalPrice] = useState('')
  const [numOfSeats, setNumOfSeats] = useState([])
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    const price=localStorage.getItem('busPrice');
    console.log("price: ",price)
    console.log("local2: ",localStorage.getItem('passengers'));
    //setNumOfSeats(localStorage.getItem('passengers'));
   // console.log("numOfSeats: ",numOfSeats)
    //setTotalPrice(price*numOfSeats); 
    const len=localStorage.getItem('numOfSeats');
    console.log("length: ",len)
    const t=price*len;
    alert(t)
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value:t,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you booking is successful!</h1>
        {/* <img alt={product.description} src={gif} /> */}
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      {/* <h1>
        {product.description} for ${product.price}
      </h1> */}
      <div ref={paypal} />
    </div>
  );

  // return (
  //   <div>
  //     <br/><br/><br/><br/>
  //     <div ref={paypal}></div>
  //   </div>
  // );
}

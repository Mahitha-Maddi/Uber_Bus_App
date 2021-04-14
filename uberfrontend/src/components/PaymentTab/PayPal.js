import React, { useState, useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const [totalPrice, setTotalPrice] = useState('')
  const [numOfSeats, setNumOfSeats] = useState([])


  
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
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <br/><br/><br/><br/>
      <div ref={paypal}></div>
    </div>
  );
}

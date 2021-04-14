import React, { useState, useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const [totalPrice, setTotalPrice] = useState('')
  const [numOfSeats, setNumOfSeats] = useState([])
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);


  saveBookedSeats=()=>{
    console.log(localStorage.getItem('selectedBusId'))
    const seat1A=0;
    
    const paramdict = {
        'busid': localStorage.getItem('selectedBusId'),
        ''
    }
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramdict)
    }
    fetch("http://localhost:5000/availableseats", config)
        .then(res => res.json())
        .then(data => {
            setFA(data[0].FA)
            //console.log("date: ",data)
            // console.log("FA",data[0].FA)
            setFB(data[0].FB)
            setFC(data[0].FC)
            setSA(data[0].SA)
            setSB(data[0].SB)
            setSC(data[0].SC)
            setTA(data[0].TA)
            setTB(data[0].TB)
            setTC(data[0].TC)
         
  }
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
     saveBookedSeats();


    return (
      <div>
        
    <br/><br/><br/><br/><br/><br/>
        <h1>Congrats, you booking is successful!</h1>
        {/* <img alt={product.description} src={gif} /> */}
      </div>
    );
  }

  return (
    <div>
      
    <br/><br/><br/><br/><br/><br/>
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

import React from 'react';
import './PaymentCat.css';


class PaymentCat extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
           
            data : ""  ,
            id : "",
            total : 0.00         
        }

        this.setTransActTotal = this.setTransActTotal.bind(this);
    }
     
    setTransActTotal(transferValue) {
        // funktio PaymentCat totalin muuttamiseksi
        //Tassa vaiheessa viela lisaa transactionista tulevat yhteen 

            let totalOld = parseFloat(this.state.total);
            let totalNew = parseFloat(transferValue + totalOld);
      
            this.setState( { ...this.state,
                total: totalNew });
        
          
         console.log("transf vanha, uusi ja siirtosumma");
          console.log(totalOld);
          console.log(totalNew);
          console.log(transferValue);
          }
   
          forceUpdate() {
            console.log("tulosta jotain");
          }

          
  
      
    render() {
        return (
            
            <div className="Payment total">"jotain" </div>
        ) ;
    }
}


export default PaymentCat; 
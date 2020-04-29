import React from 'react';
import './PaymentCat.css';


class PaymentCat extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data : {
                type: {
                    total : 0.00
                }     
            }
        }

        this.setTransActTotal = this.setTransActTotal.bind(this);
    }
     
    setTransActTotal(transferValue, eId) {
        // funktio PaymentCat totalin muuttamiseksi
        //Tassa vaiheessa viela lisaa transactionista tulevat yhteen 

            let totalOld = parseFloat(this.state.data.type.total);
            let totalNew = parseFloat(transferValue + totalOld);
            
            this.setState( { ...this.state.data,
                type: eId
             });
            
            this.setState( { ...this.state.data.type,
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
            
            <div className="Payment total">{parseFloat(this.state.data.type.total).toFixed(2) } </div>
        ) ;
    }
}


export default PaymentCat; 
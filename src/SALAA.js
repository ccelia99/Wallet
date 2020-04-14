function PaymentCat(props) {
    return (
        <div className="paymentcat">
          <div className="paymentcat__row">
            <div className="food"> <img src={food} alt=""/>FOOD </div>
            <div className="varioussmall"> <img src={varioussmall} alt="" />varioussmall</div>
          </div>
          <div className="paymentcat__row">
            <div className="pharmacy"> <img src={pharmacy} alt="" />pharmacy</div>
            <div className="meze"> <img src={meze} alt="" />meze</div>
          </div>
          <div className="paymentcat__row">
            <div className="animals"><img src={animals} alt="" />animals</div>
            <div className="gas"><img src={gas} alt="" />gas</div>
          </div>
        </div>
      );
    }
  }

 
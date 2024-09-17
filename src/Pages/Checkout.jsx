import React from 'react'
import OrderForm from '../Component/Checkout/OrderForm'
import OrderDetails from '../Component/Checkout/OrderDetails'
import BillingComponent from '../Component/Checkout/BillingDetails'
import OrderSummary from '../Component/Checkout/OrderSummary';
import { useParams } from 'react-router-dom'
import PaymentForm from '../Component/Checkout/Payment';
import AddressForm from '../Component/Checkout/AdressForm';

const Checkout = () => {
    const {step}=useParams()
  return (
    <div className="mx-auto w-[80%] md:flex md:justify-around">
<div className="md:w-[50%] ">
{step=="address"?<>
<AddressForm/>
</>:step=="shipping"?<OrderDetails/>:step=="billing"?<BillingComponent/>:step=="payment"?<PaymentForm/>:<OrderForm/>}
</div>

<div className="md:w-[40%] ">

      <OrderSummary/>
      </div>
    </div>
  )
}

export default Checkout
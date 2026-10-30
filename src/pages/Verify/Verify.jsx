import { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Le paiement n'est PAS validé ici : c'est le webhook Stripe côté serveur qui marque la commande payée.
// Cette page sert seulement à rediriger le client après Stripe.
const Verify = () => {

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url,setCartItems} = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const finish = async () => {
      if (success === "true") {
        setCartItems({});
        navigate("/myorders", { replace: true });
        return;
      }
      // Paiement abandonné : on supprime la commande non payée de l'utilisateur connecté
      const token = localStorage.getItem("token");
      if (token && orderId) {
        try {
          await axios.post(url+"/api/order/cancel",{orderId},{headers:{token}});
        } catch { /* sans effet si la commande n'existe plus */ }
      }
      navigate("/cart", { replace: true });
    }
    finish();
  },[success, orderId, url, navigate, setCartItems])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify

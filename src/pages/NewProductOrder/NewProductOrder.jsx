import './NewProductOrder.css';
import { useState, useEffect, useRef } from 'react';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';
import { Link, useNavigate } from 'react-router-dom';
import SelectionList from '../../components/SelectionList/SelectionList'
import ElementList from '../../components/ElementList/ElementList'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewProductOrder({ user, setUser }) {
    const [selectionItems, setSelectionItems] = useState([]);
    const [activeEl, setActiveEl] = useState('');
    const [cart, setCart] = useState(null);
    const elementsRef = useRef([]);
    const navigate = useNavigate();

    useEffect(function() {
        async function getProducts() {
          const products = await productsAPI.getAll();
          console.log(products)
          elementsRef.current = products.reduce((els, product) => {
            const el = product.element.name;
            return els.includes(el) ? els : [...els, el];
          }, []);
          setSelectionItems(products);
          setActiveEl(elementsRef.current[0]);  
        }
        getProducts();

        async function getCart(){
            const cart = await ordersAPI.getCart();
            setCart(cart);
        }
        getCart();
    }, []);

    //Event Handlers
    async function handleAddToOrder(productId) {
        const updatedCart = await ordersAPI.addProdToCart(productId);
        setCart(updatedCart);
    }
    
    async function handleChangeQty(productId, newQty) {
        const updatedCart = await ordersAPI.setProdQtyInCart(productId, newQty);
        setCart(updatedCart);
    }

    async function handleCheckout() {
        await ordersAPI.checkout();
        navigate('/orders');
    }

console.log(elementsRef.current)
    return (
        <main className="NewProductOrder">
          <h1>order</h1>
          <aside>
            <ElementList
              elements={elementsRef.current}
              cart={setCart}
              setActiveEl={setActiveEl}
            />
            <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
            <UserLogOut user={user} setUser={setUser} />
          </aside>
          <SelectionList
            selectionItems={selectionItems.filter(product => product.element.name === activeEl)}
            handleAddToOrder={handleAddToOrder}
          />
          <OrderDetail
            order={cart}
            handleChangeQty={handleChangeQty}
            handleCheckout={handleCheckout}
          />
        </main>
    );
}
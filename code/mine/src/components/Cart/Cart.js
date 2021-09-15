import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length>0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartitemAddHandler = item => {
        cartCtx.addItem({...item, amount:1});
    };

    const cartItems = <ul className={styles["cart-items"]}>
            {cartCtx.items.map(
                (item)=>
                    // <li>{item.name}</li>
                    <CartItem 
                    onAdd={cartitemAddHandler.bind(null, item)} 
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price}
                    />
                )}
            </ul>;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button onClick={props.onClose} className={styles["button--alt"]}>Close</button>
            {hasItems&&<button className={styles.button}>Order</button>}
        </div>
    </Modal>
};

export default Cart;
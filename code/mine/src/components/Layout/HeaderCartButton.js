import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    
    const btnClasses = `${styles.button} ${btnIsHighlighted?styles.bump:""}`;
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);

    useEffect(()=>{
        if(numberOfCartItems===0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(
            ()=>{setBtnIsHighlighted(false)
        }, 300);

        return ()=>{
            clearTimeout(timer);
        }
    },[numberOfCartItems])

    return <button onClick={props.onClick} className={btnClasses}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={styles.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;
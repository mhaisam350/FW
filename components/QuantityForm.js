import { useRef } from 'react';
import styles from './QuantityForm.module.css';

export default function QuantityForm( { quantity, maxQuantity, quantitySet } ) {

    const numberInput = useRef(null);

    function increment() {
        let value = numberInput.current.attributes[2].value;
        // console.log(value);
        // console.log(maxQuantity);
        if (parseInt(value) < maxQuantity) {
            quantitySet(parseInt(value) + 1);
        }
    }

    function decrement() {
        let value = numberInput.current.attributes[2].value;
        // console.log(value);
        if (parseInt(value) > 1) {
            quantitySet(parseInt(value) - 1);
        }
    }

    return (
        <fieldset className={styles.fieldset}>

            <legend className={styles.legend}>Quantity</legend>
            <label className={styles['number-label']}>
                    <button className={styles['quantity-btn']} onClick={decrement}>-</button>
                    <input
                        ref={numberInput}
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        min={1}
                        max={maxQuantity}
                        // onChange={(e) => {
                        //     quantitySet(parseInt(e.target.value));
                        // }}
                        readOnly
                    />
                    <button className={styles['quantity-btn']} onClick={increment}>+</button>
                    {/* {maxQuantity> 0 ? quantity : null} */}
                </label>

        </fieldset>
    )

}
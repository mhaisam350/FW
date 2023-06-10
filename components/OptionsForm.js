import styles from './OptionsForm.module.css';


export default function OptionsForm( { name, values, selectedOptions, optionsSet, quantitySet } ) {

    return (
        <fieldset className={styles.fieldset}>

            <legend className={styles.legend}>{name}</legend>

                {
                    values.map( value => {

                        const id = `${name}/${value}`;
                        const checked = selectedOptions[name] === value;
                        // console.log(id);

                        return (
                            <label key={id} className={styles['radio-label']} >
                                <input
                                    type="radio"
                                    id={id}
                                    name={name}
                                    value={value}
                                    checked={checked}
                                    onChange={() => {
                                        optionsSet(name, value);
                                        quantitySet(1);
                                    }}
                                    />
                                <span className={ name === "Color" ? styles['radio-btn'] + " " + styles['height'] : styles['radio-btn']} style={ name === "Color" ? {backgroundColor: value} : {} }> {name === "Color" ? "" : value}</span>
                            </label>
                        )

                    })
                }

                

            {/* <label>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        min={1}
                        max={maxQuantity}
                        onChange={(e) => {
                            quantitySet(parseInt(e.target.value));
                        }}
                    />
                    {maxQuantity> 0 ? quantity : null}
                </label> */}

        </fieldset>
    )

}
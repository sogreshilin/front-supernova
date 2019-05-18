import React from 'react';
import {Div, Button, HorizontalScroll} from '@vkontakte/vkui';

import styles from './Categories.css';

const categories = (props) => {
    let types = null;
    
    if (props.categories) {
        types = props.categories.map(type => (
            <div className={styles.SingleCategoryWrapper}>
                <Button size="m" level="secondary">{type}</Button>
            </div>
        ));
    }

    return (
        <Div>
            <HorizontalScroll>
                <div className={styles.CategoriesWrapper}>
                    {types}
                </div>
            </HorizontalScroll>
        </Div>
    );
}

export default categories;

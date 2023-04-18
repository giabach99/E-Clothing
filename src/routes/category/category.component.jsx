import ProductCard from "../../components/product-card/product-card.component";
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import './category.styles.scss';
import { useParams } from "react-router-dom";

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])   

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">           
                {products && products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </div>
        </Fragment>
    )
} 

export default Category;
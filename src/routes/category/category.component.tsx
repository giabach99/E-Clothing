import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import { CategoryContainer, CategoryTitle } from './category.styles';
import { useParams } from "react-router-dom";

type CategoryRouteParams = {
    category: string;
}


const Category = () => {
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])   

    return (
        <Fragment>
            <CategoryTitle className="category-title">{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>           
                    {products && products.map((product) => <ProductCard key={product.id} product={product}/>)}
                </CategoryContainer>
            )}
        </Fragment>
    )
} 

export default Category;
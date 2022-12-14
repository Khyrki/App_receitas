import React from 'react';
import { connect } from 'react-redux';
import { string, number, objectOf } from 'prop-types';
import { fetchIngredientImgAction } from '../actions';

class IngredientsCard extends React.Component {
  componentDidMount() {
    const { fetchIngredientImg } = this.props;
    const { ingredient } = this.props;
    if (window.location.pathname === '/explorar/comidas/ingredientes') {
      fetchIngredientImg(ingredient.strIngredient);
    } else {
      fetchIngredientImg(ingredient.strIngredient1);
    }
  }

  render() {
    const mxmItens = 12;
    const { ingredient, img, index } = this.props;
    if (img === undefined) return <p>Loading...</p>;
    if (img.length !== mxmItens) return <p>Loading...</p>;
    return (
      <div
        className="ingredients-card-container"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ img[index] }
          alt={ ingredient.strIngredient }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {window.location.pathname === '/explorar/comidas/ingredientes'
            ? ingredient.strIngredient
            : ingredient.strIngredient1 }
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchIngredientImg: (IngredientName) => (
    dispatch(fetchIngredientImgAction(IngredientName))),
});

const mapStateToProps = (state) => ({
  img: state.exploreReducer.image,
});

IngredientsCard.propTypes = {
  ingredient: objectOf,
  img: string,
  index: number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsCard);

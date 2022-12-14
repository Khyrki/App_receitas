import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchRecipesAction, setIsCategoryToFalseAction } from '../actions';
import '../Style/SearchBar/style.css';
import SearchButtonIcon from '../images/searchButton.svg';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      radioSearchInput: '',
      searchInputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputTextHandleChange = this.inputTextHandleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.id });
  }

  // onClick(radioSearchInput, searchInputValue) {
  //   const { setIsCategoryToFalse, fetchRecipes } = this.props;
  //   fetchRecipes(radioSearchInput, searchInputValue);
  //   setIsCategoryToFalse();
  // }

  async inputTextHandleChange({ target }) {
    await this.setState({ searchInputValue: target.value });
    const { searchInputValue, radioSearchInput } = this.state;
    this.alertUser(radioSearchInput, searchInputValue);
  }

  alertUser(radioSearchInput, searchInputValue) {
    if (radioSearchInput === 'first-letter' && searchInputValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  render() {
    const { searchInput, fetchRecipes } = this.props;
    const { radioSearchInput, searchInputValue } = this.state;
    return (
      <div>
        {searchInput && (
          <div className="searchbar-container">
            <div className="searchbar-search">
              <input
                className="searchbar-input-search"
                data-testid="search-input"
                placeholder="Buscar"
                onChange={ this.inputTextHandleChange }
              />
              <button
                className="searchbar-btn"
                type="button"
                data-testid="exec-search-btn"
                onClick={ () => fetchRecipes(radioSearchInput, searchInputValue) }
              >
                <img src={ SearchButtonIcon } alt="search button" />
              </button>
            </div>
            <div className="searchbar-radios">
              <label htmlFor="ingredient">
                <input
                  id="ingredient"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="radioSearchInput"
                  onChange={ this.handleChange }
                />
                Ingrediente
              </label>
              <label htmlFor="name">
                <input
                  id="name"
                  type="radio"
                  data-testid="name-search-radio"
                  name="radioSearchInput"
                  onChange={ this.handleChange }
                />
                Nome
              </label>
              <label htmlFor="first-letter">
                <input
                  id="first-letter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="radioSearchInput"
                  onChange={ this.handleChange }
                />
                Primeira letra
              </label>
            </div>
          </div>)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  fetchRecipes: (filter, searchInputValue) => dispach(
    fetchRecipesAction(filter, searchInputValue),
  ),
  setIsCategoryToFalse: () => dispach(setIsCategoryToFalseAction()),
});

SearchBar.propTypes = {
  fetchRecipes: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);

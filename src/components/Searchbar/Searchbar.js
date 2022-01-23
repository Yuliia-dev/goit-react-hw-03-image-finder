import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarContainer,
  SearchbarForm,
  SearchFormButton,
  SearchbarFormButtonLabel,
  SearchbarFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handleSearchValue = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imgName.trim() === '') {
      return Swal.fire(
        `Sorry,there are no pictures on request ${this.state.imgName}. Please try again`,
      );
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
            <SearchbarFormButtonLabel>Search</SearchbarFormButtonLabel>
          </SearchFormButton>

          <SearchbarFormInput
            type="text"
            name="imgName"
            value={this.state.imgName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchValue}
          />
        </SearchbarForm>
      </SearchbarContainer>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import React from 'react';
import classnames from 'classnames';

class GameForm extends React.Component {
  state = {
    id: this.props.game ? this.props.game.id : null,
    name: this.props.game ? this.props.game.name : '',
    address: this.props.game ? this.props.game.address : '',
    state: this.props.game ? this.props.game.state : '',
    city: this.props.game ? this.props.game.city : '',
    phoneNo: this.props.game ? this.props.game.phoneNo : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      id: nextProps.game.id,
      name: nextProps.game.name,
      address: nextProps.game.address,
      state: nextProps.game.state,
      city: nextProps.game.city,
      phoneNo: nextProps.game.phoneNo
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.name === '') errors.name = "Can't be empty";
    if (this.state.address === '') errors.address = "Can't be empty";
    if (this.state.state === '') errors.state = "Can't be empty";
    if (this.state.city === '') errors.city = "Can't be empty";
    if (this.state.phoneNo === '') errors.phoneNo = "Can't be empty";

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { id, name, address, state, city, phoneNo } = this.state;
      this.setState({ loading: true });
      this.props.saveGame({ id, name, address, state, city, phoneNo })
        .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new </h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.name })}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id="name"
          />
          <span>{this.state.errors.name}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.address })}>
          <label htmlFor="address">Address</label>
          <input
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
            id="address"
          />
          <span>{this.state.errors.address}</span>
        </div>
        <div className={classnames('field', { error: !!this.state.errors.state })}>
          <label htmlFor="state">State</label>
          <input
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
            id="state"
          />
          <span>{this.state.errors.state}</span>
        </div>
        <div className={classnames('field', { error: !!this.state.errors.city })}>
          <label htmlFor="city">City</label>
          <input
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
            id="city"
          />
          <span>{this.state.errors.city}</span>
        </div>
        <div className={classnames('field', { error: !!this.state.errors.phoneNo })}>
          <label htmlFor="phoneNo">PhoneNo</label>
          <input
            name="phoneNo"
            value={this.state.phoneNo}
            onChange={this.handleChange}
            id="phoneNo"
          />
          <span>{this.state.errors.phoneNo}</span>
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}


export default GameForm;

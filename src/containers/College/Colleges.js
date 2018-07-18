import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollegeForm from "./CollegeForm"
import '../../App.css'
import { search, deleteCollege } from '../../actions/collegeActions';

//College class start

class Colleges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}

    };
  }

  //Mount function
  componentWillMount() {
    this.props.search();
  }

  //delete college
  delete(id) {
    this.props.deleteCollege(id, () => {
      this.props.search();
    });
  }
  //set state for update
  handleUpdate(val) {
    this.setState({ value: val });
  }

  //render DOM
  render() {
    const { colleges } = this.props
    return (
      <div>
        <button className=" btn btn-primary" data-target="#update" data-toggle="modal"> Add<i className="fas fa-plus-circle"></i></button>
        {!colleges.length ? <div id="alert" className="alert alert-info">College not found</div> : null}

        <div className="row">
          <div className="col-md-12 table-responsive-sm">
            <table className="table table-sm table-bordered table-hover ">
              <thead className="thead-dark">
                <tr>
                  <th scope="row">ID</th>
                  <th scope="row">COLLEGE NAME</th>
                  <th scope="row">ADDRESS</th>
                  <th scope="row">STATE</th>
                  <th scope="row">CITY</th>
                  <th scope="row">PHONE NUMBER</th>
                  <th scope="row">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 && this.props.colleges.map((college, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{college.name}</td>
                    <td>{college.address}</td>
                    <td>{college.state}</td>
                    <td>{college.city}</td>
                    <td>{college.phoneNo}</td>
                    <td>
                      <button className="btn btn-success" data-target="#update" data-toggle="modal" onClick={this.handleUpdate.bind(this, college)}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-danger" onClick={this.delete.bind(this, college.id)}><i className="far fa-trash-alt"></i></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div id="update" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 >College Information</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <CollegeForm college={this.state.value} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//mapstateToProps
const mapStateToProps = (state) => {
  return ({
    colleges: state.colleges,
  })
}

Colleges = connect(mapStateToProps, { search, deleteCollege })(Colleges);

export default Colleges

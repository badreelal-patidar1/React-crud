import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css'
import { deleteMarksheet, search } from '../../actions/marksheetAction';
import MarkhseetForm from './MarkhseetForm';

//marksheet class start

class Marksheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
            }
        };
    }

    componentWillMount() {
        this.props.search();
    }

    delete(id) {
        this.props.deleteMarksheet(id, () => {
            this.props.search();
        });

    }
    handleSave(val) {
        this.setState({ value: val });
    }

    render() {
        const { marksheets } = this.props
        return (
            <div>
                <button className="btn btn-primary" data-target="#update" data-toggle="modal"> Add<i className="fas fa-plus-circle"></i></button>
                {!marksheets.length ? <div id="alert" className="alert alert-info">marksheet not found</div> : null}

                <div className="row">
                    <div className="col-md-12 table-responsive-md">
                        <table className="table table-sm table-bordered table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>ROLL_NO</th>
                                    <th>STUDENT_ID</th>
                                    <th>NAME</th>
                                    <th>PHYSICS</th>
                                    <th>CHEMISTRY</th>
                                    <th>MATHS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marksheets.length > 0 && this.props.marksheets.map((marksheet, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{marksheet.rollNo}</td>
                                        <td>{marksheet.studentId}</td>
                                        <td>{marksheet.name}</td>
                                        <td>{marksheet.chemistry}</td>
                                        <td>{marksheet.physics}</td>
                                        <td>{marksheet.maths}</td>
                                        <td>
                                            <button className="btn btn-success" data-target="#update" data-toggle="modal" onClick={this.handleSave.bind(this, marksheet)}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, marksheet.id)}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div id="update" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 >Marksheet Information</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <MarkhseetForm marksheet={this.state.value} />
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
        marksheets: state.marksheet,
    })
}

Marksheet = connect(mapStateToProps, { search, deleteMarksheet })(Marksheet);

export default Marksheet

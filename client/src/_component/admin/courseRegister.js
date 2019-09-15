import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../_actions/authentication';
import classnames from 'classnames';

class courseRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            status:'',
            teacher:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const course = {
            name: this.state.name,
            status:this.state.status,
            teacher:this.state.teacher
        }
        this.props.registercourse(course, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

   /*  componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }else{
            console.log('not authenticated')
        }
    }  */


    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>

                <div className="form-group">
{/*                     <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    /> */}
                    <select name="status" id="status" class="form-control">
                        <option value="I">Inprogress</option>
                        <option value="D">Done</option>
                    </select>
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                
                <div className="form-group">
                   {/*  <input
                    type="text"
                    placeholder="Role"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.role
                    })}
                    name="role"
                    onChange={ this.handleInputChange }
                    value={ this.state.role }
                    /> */}
                    <select name="teacher" id="teacher" class="form-control">
                        
                        {teachers.map(teacher=>{
                            <option value={teacher.id}>{teacher.name}</option>
                        })}
                        
                    </select>
                    {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register Course
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(courseRegister))

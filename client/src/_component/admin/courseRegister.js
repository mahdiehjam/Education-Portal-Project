import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GetTeacher , registerCourse } from '../../_actions/index';
import classnames from 'classnames';
import { timingSafeEqual } from 'crypto';
import Axios from 'axios';

class RegisterCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            status:'',
            teacher:'',
            teachers: [],
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
        console.log(course);
        this.props.registerCourse(course, this.props.history);
    }

    GetTeachersList = ()=>{
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

     componentWillMount() {
        Axios.get('/api/users/teacher').then(res => {
            this.setState({teachers:[...res.data]})
            //console.log(res.data);
        }).catch(err=>console.log('axios for getting teachers has err:'+ err))
    }  


    render() {
        const { errors,teachers } = this.state;
        console.log(teachers);
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
                    <select name ="status" id="status" className="form-control" onChange={ this.handleInputChange }>
                        <option value="I" key='I'>Inprogress</option>
                        <option value="D" key='D'>Done</option>
                    </select>
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
               
                <div className="form-group">
                    
                    <select name="teacher" id="teacher" className="form-control" onChange={ this.handleInputChange }>
                        
                         {teachers.map(teacher=>{
                            return <option value={teacher.id} key={teacher.id}>{teacher.name}</option>
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

RegisterCourse.propTypes = {
    registerCourse: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    users: state.users
});

export default connect(mapStateToProps,{ registerCourse })(withRouter(RegisterCourse))

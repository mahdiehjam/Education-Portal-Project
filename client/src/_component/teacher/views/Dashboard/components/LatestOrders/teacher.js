import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import axios from 'axios';
import { flexbox } from '@material-ui/system';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import download from 'downloadjs';
// import DownloadFile from '../../../../Download';
import Axios from 'axios';
import { timingSafeEqual } from 'crypto';
class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      images: [],
    }

  }

  onChangeHandler = event => {

    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }
  onClickHandler = () => {

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("/api/users/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }
  componentDidMount() {
    //console.log(this.state.selectedFile);
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push('/');
    } else {
      this.props.history.push('/');
      alert('not authenticated')

    }


  }

  componentWillMount() {
    // Axios.get('/api/users/download/123.jpg', {
    //   responseType: 'arraybuffer'
    // }).then(res=>{
    //     this.setState({
    //       image:new Buffer(res.data, 'binary').toString('base64')
    //     })

    //     console.log(this.state.image);
    // })

    this.GetImageFile('123.jpg');
     this.GetImageFile('456.jpg');
    //this.GetImageFile('789.jpg'); 

  }

  GetImageFile = (address) => {
    const { images } = this.state;
    axios({
      url: `/api/users/showimage/${address}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const image = { name: window.URL.createObjectURL(new Blob([response.data])), address: address };
      this.setState({
        images: [...images, image]
      })

    });

  }
  OnCLickDownloader = (address) => {
    Axios.get(`/api/users/download/${address}`).then(res => {
      console.log('downloading');
    })
  }
  render() {
    const { images } = this.state;
    console.log(images);
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', flexDirection: 'column' }}>

      <input type="file" style={{ width: '30%', }} name="file" onChange={this.onChangeHandler} />
      <button type="button" style={{ width: '30%', }} className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>


      <table>
        <tbody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <tr>
            <th>home works</th>
          </tr>

          {images.map(image => {
            return <tr>

              <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <img src={image.name} width='150px' height="150px" />
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch('/api/users/download',{
                   headers: {
                      address: image.address,
                      
                    }
                  });
                  const blob = await res.blob();
                  download(blob, 'test.jpg');
                }}
              >Download</button></td>
                            
                        </tr>
      })}
                </tbody>
      </table>

    </div>
  }
}




Teacher.propTypes = {
  //TeacherUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Teacher))
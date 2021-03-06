import { Upload, Icon, Modal } from 'antd';
import styles from './upload.less'

class PicturesWall extends React.Component {
    constructor({ value }) {
        super()
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList:  value ?  [{
                uid: -1,
                 name: 'xxx.png',
                 status: 'done',
                 url: value,
            }] : [],
        }
    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
         previewImage: file.url || file.thumbUrl,
         previewVisible: true,
        });
    }


    handleChange = ({ fileList, file }) => {
        this.setState({ fileList })
        if (file.response) {
            //后端给的response
            const r = file.response
            // console.log('reaponse:', r)
            const data = r.data
            // this.props.sendResp(data);
            this.props.onChange(data)
        }
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
               <Icon type="plus" />
               <div className="ant-upload-text">上传图片</div>
            </div>
        );

    return (
      <div className="clearfix">
        <Upload
          action="https://backend-test.10colour.com/upload"
          headers={{Accept: 'application/json'}}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          withCredentials={true}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;

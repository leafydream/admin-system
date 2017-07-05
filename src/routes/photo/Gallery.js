import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, Pagination, Checkbox, Button } from 'antd';

const Gallery = ({imgs, handleShowImage, dataSource, onChange, pagination, status, handleCheckBox, setStatus, checkedArray }) => {
    // console.log('imgs',imgs);
    const openGallery = (record) => {
        handleShowImage(record);
    }

    const imgsTag = imgs.map((v1, indexX) => (
        v1.map((v2, indexY) => (
            <div className="gutter-box" key={ [indexX, indexY].join('-') }>
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <div>
                        <img onClick={() => openGallery(v2)} alt="example" width="100%" src={v2.imgUrl[0]} />
                        <Checkbox className='showCheck' checked={ checkedArray.includes(v2.id) } onChange={(e) => handleCheckBox(v2, e.target.checked)} ></Checkbox>
                    </div>
                    <div className="pa-m">
                        <h3>来自于&nbsp;</h3>
                        <a href={`/appUserManage/userList?id=${v2.userId}`}><h3>{ v2.nickname }</h3></a>
                        <div><h4>{ v2.createDate }</h4></div>
                        <div><h4>状态：{ v2.status === 1 ? '违规' : '正常'}</h4></div>
                    </div>
                </Card>
            </div>
        ))
    ));

    return (
        <div className="gutter-example button-demo">
            <Button className='statusButton' size="large" disabled={checkedArray.length === 0} onClick={() => {setStatus('正常')}} >状态正常</Button>
            <Button className='statusButton' size="large" disabled={checkedArray.length === 0} onClick={() => {setStatus('违规')}} >状态违规</Button>
            <Row gutter={15}>
                <Col className="gutter-row" span={5}>
                    {imgsTag[0]}
                </Col>
                <Col className="gutter-row" span={5}>
                    {imgsTag[1]}
                </Col>
                <Col className="gutter-row" span={5}>
                    {imgsTag[2]}
                </Col>
                <Col className="gutter-row" span={5}>
                    {imgsTag[3]}
                </Col>
                <Col className="gutter-row" span={4}>
                    {imgsTag[4]}
                </Col>
            </Row>
            <style>{`
                .layout___3Z6Ys .main___YqLw- .content-inner {
                    background-color:#f6f6f6;
                }

                .ant-card {
                    margin-bottom: 15px;
                    box-shadow:0px 1px 1px 1px #d6d6d6;
                }

                .ant-checkbox-wrapper {
                    cursor: pointer;
                    font-size: 12px;
                    display: block;
                }

                .ant-card-body img {
                    cursor: pointer;
                    display: block;
                }

                .ant-card-body img:hover {
                    opacity: 0.8;
                }

                .pa-m {
                    padding: 15px 16px;
                }

                .pagination {
                    text-align: center;
                    margin-top: 20px;
                }

                h3,h4 {
                    display:inline-block;
                }

                .statusButton {
                    margin-right: 15px;
                    margin-bottom: 15px;
                }
                .showCheck {
                    position:absolute;
                    top:0%;
                    opacity:0.5;
                }
                .showCheck:hover {
                    opacity:1;
                }
            `}</style>
            <Pagination className='pagination' showQuickJumper current={pagination.current} total={dataSource.count} defaultPageSize={20} onChange={onChange} />
        </div>
    )
}

export default Gallery;

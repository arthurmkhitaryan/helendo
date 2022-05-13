import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSingleProductRequest} from "../../store/actions/product";
import withRouter from "../../helpers/withRouter";
import _ from "lodash";
import SingleProductImage from "./SingleProductImage";
import SingleProductDesc from "./SingleProductDesc";
import ErrorPage from "../../pages/ErrorPage";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '1300px',
        height: '800px',
        padding: '0 20px',
        zIndex: '99',
        // position: 'absolute'
    },
};


class QuickView extends Component {
    async componentWillMount() {
        const {id} = this.props;
        console.log(id)
        await this.props.getSingleProductRequest(id)
    }

    render() {
        const {data, open, handleClose} = this.props;
        if (!open) {
            return null;
        }
        return (
            <Modal
                isOpen={open}
                onAfterOpen={() => console.log('modal opened')}
                onRequestClose={handleClose}
                style={customStyles}
                ariaHideApp={true}
                overlayClassName="modalOverlay"
            >
                <div className="single-product-wrap section-space--pt_90 border-bottom">
                    <div className='modal-btn'>
                        <button onClick={handleClose} style={{fontSize:"30px"}}>X</button>
                    </div>
                    {!(_.isEmpty(data)) ?
                        <div className="container">
                            <div className="row">
                                <SingleProductImage data={data ? data : null}/>
                                <SingleProductDesc data={data} handleClose={handleClose}/>
                            </div>
                        </div> : <ErrorPage/>}
                </div>
            </Modal>

        );
    }
}

const mapStateToProps = (state) => (
    {
        data: state?.product?.singleProduct,
    }
)

const mapDispatchToProps = {
    getSingleProductRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuickView)

export default withRouter(Container);

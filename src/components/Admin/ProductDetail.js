import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import _ from "lodash";
import {useDispatch} from "react-redux";
import {getCategoryListRequest} from "../../store/actions/categories";
import colorOptions from "../../utils/colorOptions";
import sizeOptions from "../../utils/sizeOptions";

function ProductDetail(props) {
    const [selectedCategoriesOption, setSelectedCategoriesOption] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const data = props.data;

    useEffect(async () => {
        await (dispatch(getCategoryListRequest((err, data) => {
            if (err) {
                setErrors(data.errors || {});
            }
            if (data.list) {
                data.list.map(d => (categoriesOptions.push({
                    value: d.id, label: d.name
                })))
            }

        })))
        if (props.data) {
            props.data.categories.map(d => (selectedCategoriesOption.push({
                value: d.id, label: d.name
            })))
        }
    }, [])

    const handleAttributeChange = (ev, key) => {
        const attr = {
            value: ev.value,
            key: key,
        }
        const i = attribute.findIndex(a => (a.key === key && a.value !== ev.value));
        (i > -1) ? attribute[i] = attr : attribute.push(attr);
        setAttribute(attribute)
    }

    const handleCategoriesChange = (selectedOption) => {
        setSelectedCategoriesOption(selectedOption);
        selectedOption.map(d => ((categories.indexOf(d.value) === -1) && categories.push(d.value)))
    };

    const handleChange = (ev, key) => {
        _.unset(errors, key)
        _.set(formData, key, ev.target.value)
        setErrors({...errors})
        setFormData({...formData, attribute, categories});
    }

    return (<div className="myaccount-content">
        <h3 className="title">Product Details</h3>
        <div className="account-details-form">
            <form action="#">
                <div className="row">
                    <div className="col-lg-6">
                        <div
                            className="single-input-item mb-3">
                            <label htmlFor="first-name"
                                   className="required mb-1">Name</label>
                            <input type="text"
                                   id="first-name"
                                   placeholder='Name'
                                   defaultValue={data && data.name}
                                   required
                                   onChange={(ev) => handleChange(ev, 'name')}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div
                            className="single-input-item mb-3">
                            <label htmlFor="last-name"
                                   className="required mb-1">Title</label>
                            <input type="text"
                                   id="last-name"
                                   defaultValue={data && data.title}
                                   placeholder={'Title'}
                                   onChange={(ev) => handleChange(ev, 'title')}
                            />
                        </div>
                    </div>
                </div>
                <div className="single-input-item mb-3">
                    <label htmlFor="email"
                           className="required mb-1">Price (USD)</label>
                    <input type="number"
                           required
                           defaultValue={data && data.price}
                           placeholder={'Price'}
                           min="0"/>
                </div>
                <fieldset>
                    <div className="single-input-item mb-3">
                        <label htmlFor="current-pwd"
                               className="required mb-1">Quantity</label>
                        <input type="number"
                               required
                               defaultValue={data && data.quantity}
                               id="current-pwd"
                               placeholder="Quantity"
                               min="1"
                               onChange={(ev) => handleChange(ev, 'quantity')}
                        />
                    </div>
                    <div className="single-input-item mb-3">
                        <label htmlFor="current-pwd"
                               className="required mb-1">Sku Code</label>
                        <input type="number"
                               required
                               defaultValue={data && data.skuCode}
                               id="current-pwd"
                               placeholder="Sku Code"
                               min="0"
                               onChange={(ev) => handleChange(ev, 'skuCode')}
                        />
                    </div>
                    <div className="single-input-item mb-3">
                        <label htmlFor="file">Choose a picture</label>
                        <input type="file"
                               id="file" name="file"
                               accept="image/png, image/jpeg, 'image/gif','image/webp'"
                               onChange={(ev) => handleChange(ev, 'file')}/>
                    </div>
                    <div
                        className="single-input-item mb-3">
                        <label htmlFor="new-pwd"
                               className="required mb-1">Short Description</label>
                        <textarea className="textarea"
                                  defaultValue={data && data.shortDescription}
                                  required
                                  placeholder="Short Description"
                                  onChange={(ev) => handleChange(ev, 'shortDescription')}
                        />
                        <div
                            className="single-input-item mb-3">
                            <label htmlFor="new-pwd"
                                   className="required mb-1">Details</label>
                            <textarea className="textarea"
                                      required
                                      defaultValue={data && data.details}
                                      placeholder="Details"
                                      onChange={(ev) => handleChange(ev, 'details')}
                            />
                        </div>
                        <div
                            className="single-input-item mb-3">
                            <label htmlFor="new-pwd"
                                   className="required mb-1">Categories</label>
                            <Select
                                inputValue={!_.isEmpty(selectedCategoriesOption) ? selectedCategoriesOption.label : ''}
                                value={selectedCategoriesOption}
                                defaultValue={data && selectedCategoriesOption}
                                onChange={handleCategoriesChange}
                                options={categoriesOptions}
                                isMulti
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="single-input-item mb-3">
                                    <label htmlFor="first-name"
                                           className="required mb-1">Size</label>
                                    <Select
                                        onChange={(ev) => handleAttributeChange(ev, 'size')}
                                        options={sizeOptions}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="single-input-item mb-3">
                                    <label htmlFor="last-name"
                                           className="required mb-1">Color</label>
                                    <Select
                                        onChange={(ev) => handleAttributeChange(ev, 'color')}
                                        options={colorOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div
                    className="single-input-item single-item-button">
                    <button
                        className="btn btn btn-dark btn-hover-primary rounded-0"
                        // onClick={handleSubmit}
                    >{data ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    </div>);
}

// attribute,

export default ProductDetail;

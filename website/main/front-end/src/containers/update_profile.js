import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SketchPicker } from 'react-color';

import { updateAccount } from '../actions/index';

class EditAccount extends Component{
    constructor() {
        super();
        const picture_url =localStorage.getItem('picture_url');
        const face = {"eyes":["eyes1","eyes10","eyes2","eyes3","eyes4","eyes5","eyes6","eyes7","eyes9"],"nose":["nose2","nose3","nose4","nose5","nose6","nose7","nose8","nose9"],"mouth":["mouth1","mouth10","mouth11","mouth3","mouth5","mouth6","mouth7","mouth9"]};
        let eyes, nose, mouth, color;
        for(let i = 0; i < face.eyes.length; i++) {

            if (picture_url.includes(face.eyes[i])) {
                eyes = i;
                break;
            }
        }
        for(let i = 0; i < face.nose.length; i++) {
            if (picture_url.includes(face.nose[i])) {
                nose = i;
                break;
            }
        }
        for(let i = 0; i < face.mouth.length; i++) {
            if (picture_url.includes(face.mouth[i])) {
                mouth = i;
                break;
            }
        }
        if (!eyes) eyes = 0;
        if (!nose) nose = 0;
        if (!mouth) mouth = 0;

        const lastSeven = picture_url.substr(picture_url.length - 6);
        if (lastSeven.charAt(0) === '/') {
            color = lastSeven.replace('/','');
        }else {
            color = '8e8895'
        }

        const picture = `https://api.adorable.io/avatars/face/${face.eyes[eyes]}/${face.nose[nose]}/${face.mouth[mouth]}/${color}`;
        this.state = {
            description: localStorage.getItem('description'),
            picture: picture,
            face: face,
            eyes: eyes,
            nose: nose,
            mouth: mouth,
            color: color
        };
        this.handleDescription = this.handleDescription.bind(this);
        this.eyesNext = this.eyesNext.bind(this);
        this.eyesPrevious = this.eyesPrevious.bind(this);
        this.nosePrevious = this.nosePrevious.bind(this);
        this.noseNext = this.noseNext.bind(this);
        this.mouthPrevious = this.mouthPrevious.bind(this);
        this.mouthNext = this.mouthNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    handleSubmit() {
        const {face} = this.state;
        const image = `https://api.adorable.io/avatars/face/${face.eyes[this.state.eyes]}/${face.nose[this.state.nose]}/${face.mouth[this.state.mouth]}/${this.state.color}`;
        const values = {
            description: this.state.description,
            picture_url: image
        };
        this.props.updateAccount(localStorage.getItem('id'), values);
    }

    eyesPrevious() {
        let item = this.state.eyes;
        const array = this.state.face.eyes;
        item--;
        const index = item < 0 ? array.length - 1 : item;
        this.setState({
            eyes: index
        });
    }

    eyesNext() {
        let item = this.state.eyes;
        const array = this.state.face.eyes;
        item++;
        const index = item >= array.length ? 0 : item;
        this.setState({
            eyes: index
        });
    }

    nosePrevious() {
        let item = this.state.nose;
        const array = this.state.face.nose;
        item--;
        const index = item < 0 ? array.length - 1 : item;
        this.setState({
            nose: index
        });
    }

    noseNext() {
        let item = this.state.nose;
        const array = this.state.face.nose;
        item++;
        const index = item >= array.length ? 0 : item;
        this.setState({
            nose: index
        });
    }

    mouthPrevious() {
        let item = this.state.mouth;
        const array = this.state.face.mouth;
        item--;
        const index = item < 0 ? array.length - 1 : item;
        this.setState({
            mouth: index
        });
    }

    mouthNext() {
        let item = this.state.mouth;
        const array = this.state.face.mouth;
        item++;
        const index = item >= array.length ? 0 : item;
        this.setState({
            mouth: index
        });
    }

    handleColorChange(color) {
        this.setState({
            color: color.hex.replace('#','')
        });
    }

    render() {
        const {face} = this.state;
        const image = `https://api.adorable.io/avatars/face/${face.eyes[this.state.eyes]}/${face.nose[this.state.nose]}/${face.mouth[this.state.mouth]}/${this.state.color}`;
        return (
            <div>
                <div>
                    <img src={image} alt="avatar" className="img-responsive"/>
                    <button onClick={this.eyesPrevious}>{'<-'}</button>eyes<button onClick={this.eyesNext}>-></button><br/>
                    <button onClick={this.nosePrevious}>{'<-'}</button>nose<button onClick={this.noseNext}>-></button><br/>
                    <button onClick={this.mouthPrevious}>{'<-'}</button>mouth<button onClick={this.mouthPrevious}>-></button><br/>
                    <SketchPicker
                        color={ this.state.color }
                        onChangeComplete={ this.handleColorChange }
                    />
                </div>
                <textarea rows="4" cols="50" value={this.state.description} onChange={this.handleDescription}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateAccount}, dispatch);
}

export default connect(null, mapDispatchToProps)(EditAccount);
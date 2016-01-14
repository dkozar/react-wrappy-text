import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WrappyText } from './components/WrappyText.js';
import { TextRotator } from './components/TextRotator.js';
import { ScrollListener } from './components/ScrollListener.js';

const BUTTON_TEXT = 'Do it again!';

require('./styles/main.css');

const texts = [
        'This is the wrappy text.',
        'Wrappy text is the next <h1>.',
        'Because UI is show business.',
        'Throwing dice for each letter...'
    ],

    longTexts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut turpis urna. Aliquam erat volutpat. Fusce vehicula ipsum a ligula placerat scelerisque. Praesent iaculis erat sapien, vel dictum sem tincidunt id. Vestibulum luctus porttitor porttitor. Pellentesque erat ex, fermentum sit amet arcu non, imperdiet condimentum magna. Donec finibus, leo nec cursus tristique, mauris nisi tempor nisl, in condimentum erat metus non tellus. Praesent suscipit diam nec purus mattis, eget ornare mi tempor.',
        'Donec consequat sagittis nibh vitae mollis. Nullam sagittis augue eu vehicula imperdiet. Donec aliquet, velit nec molestie vehicula, erat felis convallis eros, vitae euismod lectus felis ac lectus. Aliquam dictum leo non ex mollis, non viverra elit condimentum. Cras sit amet dictum lectus. Fusce ornare metus odio, ut lacinia ligula egestas lobortis. Aliquam condimentum vulputate sem id tempor. Vestibulum congue euismod justo. Donec quis erat vitae urna ultricies fermentum non suscipit lacus. Sed ac mollis nunc, egestas malesuada velit. Etiam sed eleifend tortor, ut blandit ex. Nulla non neque quis turpis tristique placerat in vel nisi.',
        'In pretium vel lorem id pellentesque. Nullam quis eros ut urna pharetra tristique vel et quam. Vivamus sit amet velit in erat aliquet suscipit. Suspendisse bibendum magna tellus, ac rutrum lorem facilisis at. Phasellus eget tellus tincidunt, ullamcorper metus non, consectetur risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras sagittis lorem lobortis, bibendum nunc vel, rutrum leo. Nulla convallis maximus lorem quis interdum. Sed posuere tincidunt mi sit amet aliquet. Vivamus bibendum nisl risus, in condimentum dui luctus id. Vivamus ullamcorper ante eu lectus porta venenatis. Vivamus consectetur dui porta ipsum tristique dictum.'
    ];

export class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: texts[0],
            longText: longTexts[0]
        };

        this.changeText = this.changeText.bind(this);
        this.changeLongText = this.changeLongText.bind(this);
        this.onProgress = this.onProgress.bind(this);

        this.count = 0;
        this.count2 = 0;
    }

    changeText() {
        this.count ++;
        this.setState({
            text: texts[this.count % texts.length]
        });
    }

    changeLongText() {
        this.count2 ++;
        this.setState({
            longText: longTexts[this.count2 % longTexts.length]
        });
    }

    onProgress(ref, info) {
        var progress = info.done / info.total;
        ReactDOM.findDOMNode(this.refs[ref]).style['width'] = 100 * progress + '%';
    }

    render() {
        return (
            <div>
                <div className='separator' />

                {/* title */}

                <TextRotator texts={texts}>
                    <WrappyText className='reveal wrappy title-text red title' ref='title'></WrappyText>
                </TextRotator>

                <div className='separator' />

                {/* shuffle */}

                <ScrollListener text='Whenever the text changes, I shuffle'>
                    <WrappyText className='reveal wrappy small-text green'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text green'></WrappyText>
                </ScrollListener>

                <button className='reveal button green' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* progress */}

                <ScrollListener text='I dispatch progress events'>
                    <WrappyText className='reveal wrappy small-text blue'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text blue' onProgress={this.onProgress.bind(this, 'progress-progress')}></WrappyText>
                    <div ref='progress-progress' className='reveal progress blue' />
                </ScrollListener>

                <button className='reveal button blue' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* big */}

                <ScrollListener text='I can handle long texts'>
                    <WrappyText className='reveal wrappy small-text purple'></WrappyText>
                </ScrollListener>

                <ScrollListener className='huge-parent' text={this.state.longText}>
                    <WrappyText className='reveal wrappy small-text huge purple' onProgress={this.onProgress.bind(this, 'progress-big')} factor={0.1}></WrappyText>
                </ScrollListener>

                <div ref='progress-big' className='reveal progress purple' />

                <button className='reveal button purple' onClick={this.changeLongText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* slower */}

                <ScrollListener text='I can animate slower'>
                    <WrappyText className='reveal wrappy small-text green'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text green' fps={10} onProgress={this.onProgress.bind(this, 'progress-slower')}></WrappyText>
                </ScrollListener>

                <div ref='progress-slower' className='reveal progress green' />

                <button className='reveal button green' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* faster */}

                <ScrollListener text='I can animate faster'>
                    <WrappyText className='reveal wrappy small-text yellow'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text yellow' fps={120} onProgress={this.onProgress.bind(this, 'progress-faster')}></WrappyText>
                </ScrollListener>

                <div ref='progress-faster' className='reveal progress yellow' />

                <button className='reveal button yellow' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* probability */}

                <ScrollListener text='I can use different probability'>
                    <WrappyText className='reveal wrappy small-text red'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text red' factor={10} onProgress={this.onProgress.bind(this, 'progress-probability')}></WrappyText>
                </ScrollListener>

                <div ref='progress-probability' className='reveal progress red' />

                <button className='reveal button red' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* custom replacements */}

                <ScrollListener text='I can use custom replacement characters'>
                    <WrappyText className='reveal wrappy small-text orange'></WrappyText>
                </ScrollListener>

                <ScrollListener text={this.state.text}>
                    <WrappyText className='reveal wrappy big-text orange' replacements='$$$$$$$$$$$$$$$$$$$**********'></WrappyText>
                </ScrollListener>

                <button className='reveal button orange' onClick={this.changeText}>{BUTTON_TEXT}</button><div className='separator' />

                <div className='separator' />

                {/* (C) Danko Kozar */}

                <ScrollListener text='Brought to you by:'>
                    <WrappyText className='reveal wrappy small-text purple'></WrappyText>
                </ScrollListener>

                <ScrollListener text='Danko Kozar'>
                    <WrappyText className='reveal wrappy big-text purple' fps={120} factor={20} replacements='$$$$$$$$$$$$$$$$$$$DKDKDKDKDK'></WrappyText>
                </ScrollListener>

                <div className='separator' />

            </div>
        );
    }

    componentDidMount() {
        // a touch of reveal animation
        window.sr = new ScrollReveal();
        sr.reveal('.reveal');
    }
}

/* Let's get serious :). This is actually the learning example, containing all the important things about React and DOM interaction. */
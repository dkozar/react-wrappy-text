import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WrappyText } from './WrappyText.js';
import { intersects } from '../util/rect.js';

export class TextRotator extends Component {

    constructor(props) {
        super(props);

        this.onScrollOrResize = this.onScrollOrResize.bind(this);

        this.state = {
            text: props.texts[0],
            index: 0
        };
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this).firstChild;
        window.addEventListener('scroll', this.onScrollOrResize);
        window.addEventListener('resize', this.onScrollOrResize);
        this.onScrollOrResize();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollOrResize);
        window.addEventListener('resize', this.onScrollOrResize);
        if (this.interval) {
            this.stop();
        }
    }

    start() {
        this.renderCurrentText();
        this.interval = setInterval(
            () => {
                this.setState({
                    index: (this.state.index + 1) % this.props.texts.length
                });
                this.renderCurrentText();
            },
            3000
        );
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    renderCurrentText() {
        this.setState({
            text: this.props.texts[this.state.index]
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.text === this.props.text) {
            return;
        }
        this.setState({
            text: nextProps.texts[0]
        });
    }

    onScrollOrResize() {
        var viewportRect = {
            top: 0,
            bottom: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        },
        elementRect = this.element.getBoundingClientRect(),
        isVisible = intersects(viewportRect, elementRect)

        if (isVisible && !this.interval) {
            this.start();
        } else if (!isVisible && this.interval) {
            this.stop();
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.renderChildren()}
            </div>
        )
    }

    renderChildren() {
        var self = this;

        return React.Children.map(this.props.children, function (child) {
            if (child.type.displayName === 'WrappyText') {
                return React.cloneElement(child, {
                    children: self.state.text
                });
            }
            else {
                return child; // leave other elements intact
            }
        }.bind(this));
    }
}

TextRotator.defaultProps = {
    texts: []
};

TextRotator.propTypes = {
    texts: React.PropTypes.array
};
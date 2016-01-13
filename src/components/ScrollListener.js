import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WrappyText } from './WrappyText.js';
import { intersects } from '../util/rect.js';

export class ScrollListener extends Component {

    constructor(props) {
        super(props);

        this.onScrollOrResize = this.onScrollOrResize.bind(this);

        this.state = {
            text: ''
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
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.text === this.props.text) {
            return;
        }
        this.setState({
            text: nextProps.text
        });
    }

    onScrollOrResize() {
        var viewportRect = {
            top: 0,
            bottom: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        },
        elementRect = this.element.getBoundingClientRect();

        this.setState({
            text: intersects(viewportRect, elementRect) ? this.props.text : '_'
        });
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
            if (child.type === WrappyText) {
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

ScrollListener.defaultProps = {
    text: ''
};

ScrollListener.propTypes = {
    text: React.PropTypes.string
};
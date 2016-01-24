'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _WrappyText = require('./WrappyText.js');

var _WrappyText2 = _interopRequireDefault(_WrappyText);

var _rect = require('../util/rect.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextRotator = function (_Component) {
    _inherits(TextRotator, _Component);

    function TextRotator(props) {
        _classCallCheck(this, TextRotator);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextRotator).call(this, props));

        _this.onScrollOrResize = _this.onScrollOrResize.bind(_this);

        _this.state = {
            text: props.texts[0],
            index: 0
        };
        return _this;
    }

    _createClass(TextRotator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.element = _reactDom2.default.findDOMNode(this).firstChild;
            window.addEventListener('scroll', this.onScrollOrResize);
            window.addEventListener('resize', this.onScrollOrResize);
            this.onScrollOrResize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('scroll', this.onScrollOrResize);
            window.removeEventListener('resize', this.onScrollOrResize);
            if (this.interval) {
                this.stop();
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.renderCurrentText();
            this.interval = setInterval(function () {
                _this2.setState({
                    index: (_this2.state.index + 1) % _this2.props.texts.length
                });
                _this2.renderCurrentText();
            }, 3000);
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.interval);
            this.interval = null;
        }
    }, {
        key: 'renderCurrentText',
        value: function renderCurrentText() {
            this.setState({
                text: this.props.texts[this.state.index]
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.text === this.props.text) {
                return;
            }
            this.setState({
                text: nextProps.texts[0]
            });
        }
    }, {
        key: 'onScrollOrResize',
        value: function onScrollOrResize() {
            var viewportRect = {
                top: 0,
                bottom: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            },
                elementRect = this.element.getBoundingClientRect(),
                isVisible = (0, _rect.intersects)(viewportRect, elementRect);

            if (isVisible && !this.interval) {
                this.start();
            } else if (!isVisible && this.interval) {
                this.stop();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                this.renderChildren()
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var self = this;

            return _react2.default.Children.map(this.props.children, function (child) {
                if (child.type === _WrappyText2.default) {
                    return _react2.default.cloneElement(child, {
                        children: self.state.text
                    });
                } else {
                    return child; // leave other elements intact
                }
            }.bind(this));
        }
    }]);

    return TextRotator;
}(_react.Component);

exports.default = TextRotator;

TextRotator.defaultProps = {
    texts: []
};

TextRotator.propTypes = {
    texts: _react2.default.PropTypes.array
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('/workspace/react-wrappy-text/node_modules/babel-preset-react-hmre/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/workspace/react-wrappy-text/node_modules/babel-preset-react-hmre/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/workspace/react-wrappy-text/node_modules/babel-preset-react-hmre/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _WrappyText = require('./WrappyText.js');

var _WrappyText2 = _interopRequireDefault(_WrappyText);

var _rect = require('../util/rect.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    TextRotator: {
        displayName: 'TextRotator'
    }
};

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/components/TextRotator.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/components/TextRotator.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2(_workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

var TextRotator = _wrapComponent('TextRotator')(function (_Component) {
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
            return _react3.default.createElement(
                'div',
                { className: this.props.className },
                this.renderChildren()
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var self = this;

            return _react3.default.Children.map(this.props.children, function (child) {
                if (child.type === _WrappyText2.default) {
                    return _react3.default.cloneElement(child, {
                        children: self.state.text
                    });
                } else {
                    return child; // leave other elements intact
                }
            }.bind(this));
        }
    }]);

    return TextRotator;
}(_react2.Component));

exports.default = TextRotator;

TextRotator.defaultProps = {
    texts: []
};

TextRotator.propTypes = {
    texts: _react3.default.PropTypes.array
};
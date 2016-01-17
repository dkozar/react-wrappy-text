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
    ScrollListener: {
        displayName: 'ScrollListener'
    }
};

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/components/ScrollListener.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/components/ScrollListener.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2(_workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

var ScrollListener = _wrapComponent('ScrollListener')(function (_Component) {
    _inherits(ScrollListener, _Component);

    function ScrollListener(props) {
        _classCallCheck(this, ScrollListener);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollListener).call(this, props));

        _this.onScrollOrResize = _this.onScrollOrResize.bind(_this);

        _this.state = {
            text: ''
        };
        return _this;
    }

    _createClass(ScrollListener, [{
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
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.text === this.props.text) {
                return;
            }
            this.setState({
                text: nextProps.text
            });
        }
    }, {
        key: 'onScrollOrResize',
        value: function onScrollOrResize() {
            var viewportRect = {
                top: 0,
                bottom: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            },
                elementRect = this.element.getBoundingClientRect();

            this.setState({
                text: (0, _rect.intersects)(viewportRect, elementRect) ? this.props.text : '_'
            });
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

    return ScrollListener;
}(_react2.Component));

exports.default = ScrollListener;

ScrollListener.defaultProps = {
    text: ''
};

ScrollListener.propTypes = {
    text: _react3.default.PropTypes.string
};
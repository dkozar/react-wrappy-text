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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    WrappyText: {
        displayName: 'WrappyText'
    }
};

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/components/WrappyText.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/components/WrappyText.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformHmrLibIndexJs2(_workspaceReactWrappyTextNode_modulesBabelPresetReactHmreNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

var WrappyText = _wrapComponent('WrappyText')(function (_Component) {
    _inherits(WrappyText, _Component);

    function WrappyText(props) {
        _classCallCheck(this, WrappyText);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WrappyText).call(this, props));

        _this.state = {
            currentText: '_'
        };
        return _this;
    }

    _createClass(WrappyText, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.shuffle(this.props);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.interval);
        }
    }, {
        key: 'shuffle',
        value: function shuffle(props) {
            var _this2 = this;

            var text = props.children || '',
                fps = props.fps,
                len = text.length,
                // final text length
            chars = [],
                // current characters
            done = {},
                // flags indicating positions having the final characters
            delay = fps > 0 ? 1000 / fps : 0; // delay between changes

            this.setState({
                len: len,
                rLen: props.replacements.length,
                currentText: props.replacements[0] || '_',
                notDoneCount: len,
                last: this.getTime(),
                delay: delay,
                chars: chars,
                done: done
            });

            if (this.interval) {
                clearInterval(this.interval);
            }

            this.interval = setInterval(function () {
                return _this2.tick();
            }, delay);
        }
    }, {
        key: 'fireProgress',
        value: function fireProgress() {
            this.props.onProgress({
                total: this.state.len,
                done: this.state.len - this.state.notDoneCount
            });
        }
    }, {
        key: 'getTime',
        value: function getTime() {
            return new Date().getTime();
        }
    }, {
        key: 'getReplacement',
        value: function getReplacement() {
            var replacement = this.props.replacements[this.random(this.state.rLen)];

            return replacement === '$' ? '' : replacement;
        }
    }, {
        key: 'random',
        value: function random(max) {
            return Math.floor(Math.random() * max);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.children === this.props.children) {
                return;
            }
            this.shuffle(nextProps);
        }
    }, {
        key: 'tick',
        value: function tick() {
            var len = this.state.len,
                flags = this.state.done,
                chars = this.state.chars,
                text = this.props.children,
                factor = this.props.factor,
                notDoneCount = this.state.notDoneCount,
                i,
                currentText,
                time;

            if (this.props.fps > 0) {
                time = this.getTime();
                if (time - this.state.last < this.state.delay) return;

                this.setState({
                    last: time
                });

                for (i = 0; i < len; i++) {
                    if (!flags[i]) {

                        if (this.random(notDoneCount * factor) === 0) {
                            chars[i] = text[i];
                            flags[i] = true;
                            notDoneCount--;
                            this.fireProgress();
                        } else {
                            chars[i] = this.getReplacement();
                        }
                    }
                }

                currentText = chars.join('');

                this.setState({
                    currentText: currentText,
                    notDoneCount: notDoneCount,
                    done: flags
                });

                if (notDoneCount === 0) {
                    clearInterval(this.interval);
                    this.fireProgress();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                'div',
                { className: this.props.className },
                this.state.currentText
            );
        }
    }]);

    return WrappyText;
}(_react2.Component));

exports.default = WrappyText;

WrappyText.defaultProps = {
    children: '', // final text
    replacements: '$$$$$$$$$$$$$$$$$$$\\\\___+-_', // '$' does not render
    fps: 40, // frames per second
    factor: 0.8, // the greater the factor, longer time needed to settle
    onProgress: function onProgress() {} // on progress callback

};

WrappyText.propTypes = {
    children: _react3.default.PropTypes.string,
    replacements: _react3.default.PropTypes.string,
    fps: _react3.default.PropTypes.number,
    factor: _react3.default.PropTypes.number,
    onProgress: _react3.default.PropTypes.func
};
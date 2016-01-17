import React, { Component } from 'react';

export default class WrappyText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentText: '_'
        };
    }

    componentDidMount() {
        this.shuffle(this.props);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    shuffle(props) {
        var text = props.children || '',
            fps = props.fps,
            len = text.length, // final text length
            chars = [], // current characters
            done = {}, // flags indicating positions having the final characters
            delay = fps > 0 ? 1000/fps : 0; // delay between changes

        this.setState({
            len,
            rLen: props.replacements.length,
            currentText: props.replacements[0] || '_',
            notDoneCount: len,
            last: this.getTime(),
            delay,
            chars,
            done
        });

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => this.tick(), delay);
    }

    fireProgress() {
        this.props.onProgress({
            total: this.state.len,
            done: this.state.len - this.state.notDoneCount
        });
    }

    getTime() {
        return (new Date().getTime());
    }

    getReplacement() {
        var replacement = this.props.replacements[this.random(this.state.rLen)];

        return replacement === '$' ? '' : replacement;
    }

    random(max) {
        return Math.floor(Math.random() * max);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.children === this.props.children) {
            return;
        }
        this.shuffle(nextProps);
    }

    tick() {
        var len = this.state.len,
            flags = this.state.done,
            chars = this.state.chars,
            text = this.props.children,
            factor = this.props.factor,
            notDoneCount = this.state.notDoneCount,
            i, currentText, time;

        if (this.props.fps > 0)
        {
            time = this.getTime();
            if (time - this.state.last < this.state.delay)
                return;

            this.setState({
                last: time
            });

            for (i = 0; i < len; i++)
            {
                if (!flags[i]) {

                    if (this.random(notDoneCount * factor) === 0)
                    {
                        chars[i] = text[i];
                        flags[i] = true;
                        notDoneCount--;
                        this.fireProgress();
                    }
                    else
                    {
                        chars[i] = this.getReplacement();
                    }
                }
            }

            currentText = chars.join('');

            this.setState({
                currentText,
                notDoneCount,
                done: flags
            });

            if (notDoneCount === 0)
            {
                clearInterval(this.interval);
                this.fireProgress();
            }
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.state.currentText}
            </div>
        );
    }
}

WrappyText.defaultProps = {
    children: '', // final text
    replacements: '$$$$$$$$$$$$$$$$$$$\\\\___+-_', // '$' does not render
    fps: 40, // frames per second
    factor: 0.8, // the greater the factor, longer time needed to settle
    onProgress() {} // on progress callback
};

WrappyText.propTypes = {
    children: React.PropTypes.string,
    replacements: React.PropTypes.string,
    fps: React.PropTypes.number,
    factor: React.PropTypes.number,
    onProgress: React.PropTypes.func
};
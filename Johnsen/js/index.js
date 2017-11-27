"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/
// http://exploringjs.com/es6/ch_classes.html
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var View = function (_React$Component) {
    _inherits(View, _React$Component);

    function View(props) {
        _classCallCheck(this, View);

        //: getInitialState() method

        var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this2.state = {
            minutes: 0,
            seconds: 0,
            millis: 0,
            running: false
        };

        _this2._handleStartClick = _this2._handleStartClick.bind(_this2);
        _this2._handleStopClick = _this2._handleStopClick.bind(_this2);
        _this2._handleResetClick = _this2._handleResetClick.bind(_this2);
        return _this2;
    }

    View.prototype._handleStartClick = function _handleStartClick(event) {
        var _this3 = this;

        var _this = this;
        if (!this.state.running) {
            this.interval = setInterval(function () {
                _this3.tick();
            }, 100);

            this.setState({ running: true });
        }
    };

    View.prototype._handleStopClick = function _handleStopClick(event) {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({ running: false });
        }
    };

    View.prototype._handleResetClick = function _handleResetClick(event) {
        this._handleStopClick();
        this.update(0, 0, 0);
    };

    View.prototype.tick = function tick() {
        var millis = this.state.millis + 1;
        var seconds = this.state.seconds;
        var minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }

        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.update(millis, seconds, minutes);
    };

    View.prototype.zeroPad = function zeroPad(value) {
        return value < 10 ? "0" + value : value;
    };

    View.prototype.update = function update(millis, seconds, minutes) {
        this.setState({
            millis: millis,
            seconds: seconds,
            minutes: minutes
        });
    };

    View.prototype.componentDidMount = function componentDidMount() {
        //TODO  
    };

    View.prototype.componentWillUnMount = function componentWillUnMount() {
        //TODO
    };

    View.prototype.render = function render() {
        var run = this.state.running === true;
        return React.createElement(
            "div",
            { className: "app" },
            React.createElement(
                "header",
                { className: "header" },
                React.createElement(
                    "div",
                    { className: "title" },
                    "Chronometer-",
                    this.props.ver
                )
            ),
            React.createElement(
                "main",
                { className: "main" },
                React.createElement(
                    "div",
                    { className: "display" },
                    React.createElement(
                        "div",
                        { className: "state" },
                        run ? 'Running' : 'Stop'
                    ),
                    React.createElement(
                        "div",
                        { className: "segments" },
                        React.createElement(
                            "span",
                            { className: "mins" },
                            this.zeroPad(this.state.minutes),
                            ":"
                        ),
                        React.createElement(
                            "span",
                            { className: "secs" },
                            this.zeroPad(this.state.seconds),
                            " "
                        ),
                        React.createElement(
                            "span",
                            { className: "millis" },
                            ".0",
                            this.state.millis
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "actions" },
                    React.createElement(
                        "button",
                        { className: "btn start " + (run ? 'disabled' : ''),
                            onClick: this._handleStartClick },
                        "Start"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn stop " + (false == run ? 'disabled' : ''),
                            onClick: this._handleStopClick },
                        "Stop"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn reset " + (this.state.seconds > 0 && false == run ? '' : 'disabled'),
                            onClick: this._handleResetClick },
                        "Reset"
                    )
                )
            )
        );
    };

    return View;
}(React.Component);

ReactDOM.render(React.createElement(View, { ver: "0.1.0" }), document.querySelector('#app'));
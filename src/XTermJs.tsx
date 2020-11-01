import * as React from 'react';
import { Terminal } from 'xterm';
// @ts-ignore
// import * as Xterm from "xterm/lib/xterm";

// tslint:disable-next-line: no-var-requires
const classNames = require('classnames')

export interface IXtermProps extends React.DOMAttributes<{}> {
    onChange?: (e: any) => void;
    onInput?: (e: any) => void;
    onFocusChange?: (e: any) => void;
    addons?: string[];
    onScroll?: (e: any) => void;
    onContextMenu?: (e: any) => void;
    options?: any;
    path?: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
}

export interface IXtermState {
    isFocused: boolean;
}

export default class XTerm extends React.Component<IXtermProps, IXtermState> {
    private xterm: any;
    private container: HTMLDivElement | null;
    constructor(props: IXtermProps) {
        super(props);

        this.xterm = null;
        this.container = null

        this.state = {
            isFocused: false
        };
    }

    componentDidMount() {
        this.xterm = new Terminal(this.props.options);
        this.xterm.open(this.container as HTMLDivElement);
        // this.xterm.on('focus', this.focusChanged.bind(this, true));
        // this.xterm.on('blur', this.focusChanged.bind(this, false));
        if (this.props.onContextMenu) {
            this.xterm.element.addEventListener('contextmenu', this.onContextMenu.bind(this));
        }
        if (this.props.onInput) {
            this.xterm.on('data', this.onInput);
        }
        if (this.props.value) {
            this.xterm.write(this.props.value);
        }
    }

    componentWillUnmount() {
        // is there a lighter-weight way to remove the cm instance?
        if (this.xterm) {
            // this.xterm.destroy();
            this.xterm = null;
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // console.log('shouldComponentUpdate', nextProps.hasOwnProperty('value'), nextProps.value != this.props.value);
        if (nextProps.hasOwnProperty('value') && nextProps.value !== this.props.value) {
            if (this.xterm) {
                this.xterm.clear();
                setTimeout(() => {
                    this.xterm?.write(nextProps.value);
                }, 0)
            }
        }
        return false;
    }

    getTerminal(): any {
        return this.xterm;
    }

    write(data: any) {
        this.xterm && this.xterm.write(data);
    }

    writeln(data: any) {
        this.xterm && this.xterm.writeln(data);
    }

    focus() {
        this.xterm?.focus();
    }

    focusChanged(focused: any) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }

    onInput(data: any) {
        this.props.onInput && this.props.onInput(data);
    }

    resize(cols: number, rows: number) {
        this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
    }

    setOption(key: string, value: boolean) {
        this.xterm && this.xterm.setOption(key, value);
    }

    refresh() {
        this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
    }

    onContextMenu(e: any) {
        this.props.onContextMenu && this.props.onContextMenu(e);
    }

    render() {
        const terminalClassName = classNames('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return <div ref={ref => { this.container = ref }} className={terminalClassName} />;
    }
}
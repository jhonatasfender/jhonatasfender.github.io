import * as React from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

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
    private xterm: Terminal | null;
    private container: HTMLDivElement | null;
    private fitAddon: FitAddon;

    constructor(props: IXtermProps) {
        super(props);

        this.xterm = null;
        this.container = null

        this.fitAddon = new FitAddon();

        this.state = {
            isFocused: false
        };
    }

    public componentDidMount(): void {
        this.xterm = new Terminal(this.props.options);

        this.xterm.loadAddon(this.fitAddon)

        this.xterm.open(this.container as HTMLDivElement);
        this.xterm.focus()
        this.xterm.blur()
        if (this.props.onContextMenu) {
            this.xterm.element?.addEventListener('contextmenu', this.onContextMenu.bind(this));
        }
        if (this.props.onInput) {
            this.xterm.onData(this.onInput);
        }
        if (this.props.value) {
            this.xterm.write(this.props.value);
        }

        this.fitAddon.fit()
    }

    public componentWillUnmount(): void {
        if (this.xterm) {
            this.xterm = null;
        }
    }

    public getFitAddon(): FitAddon {
        return this.fitAddon
    }

    public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
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

    public getTerminal(): Terminal {
        return this.xterm as Terminal;
    }

    public write(data: any): void {
        this.xterm && this.xterm.write(data);
    }

    public writeln(data: any): void {
        this.xterm && this.xterm.writeln(data);
    }

    focusChanged(focused: any) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }

    public resize(cols: number, rows: number): void {
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

    private onInput(data: any): void {
        this.props.onInput && this.props.onInput(data);
    }


    public render(): JSX.Element {
        const terminalClassName = classNames('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return <div ref={ref => { this.container = ref }} className={terminalClassName} />;
    }
}
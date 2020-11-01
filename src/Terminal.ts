import { IBufferLine, IDisposable, IEvent, ILinkMatcherOptions, IMarker, ISelectionPosition, ITerminalAddon, ITheme } from 'xterm';

export interface IEventEmitter<T, U = void> {
    event: IEvent<T, U>;
    fire(arg1: T, arg2: U): void;
    dispose(): void;
}

export interface IExtendedAttrs {
    underlineStyle: number;
    underlineColor: number;
    clone(): IExtendedAttrs;
    isEmpty(): boolean;
}

export interface IAttributeData {
    fg: number;
    bg: number;
    extended: IExtendedAttrs;

    clone(): IAttributeData;

    // flags
    isInverse(): number;
    isBold(): number;
    isUnderline(): number;
    isBlink(): number;
    isInvisible(): number;
    isItalic(): number;
    isDim(): number;

    // color modes
    getFgColorMode(): number;
    getBgColorMode(): number;
    isFgRGB(): boolean;
    isBgRGB(): boolean;
    isFgPalette(): boolean;
    isBgPalette(): boolean;
    isFgDefault(): boolean;
    isBgDefault(): boolean;
    isAttributeDefault(): boolean;

    // colors
    getFgColor(): number;
    getBgColor(): number;

    // extended attrs
    hasExtendedAttrs(): number;
    updateExtended(): void;
    getUnderlineColor(): number;
    getUnderlineColorMode(): number;
    isUnderlineColorRGB(): boolean;
    isUnderlineColorPalette(): boolean;
    isUnderlineColorDefault(): boolean;
    getUnderlineStyle(): number;
}

export interface ICharset {
    [key: string]: string | undefined;
}

export type CharData = [number, string, number, number];

export interface ICellData extends IAttributeData {
    content: number;
    combinedData: string;
    isCombined(): number;
    getWidth(): number;
    getChars(): string;
    getCode(): number;
    setFromCharData(value: CharData): void;
    getAsCharData(): CharData;
}

export interface IBuffer {
    readonly lines: ICircularList<IBufferLine>;
    ydisp: number;
    ybase: number;
    y: number;
    x: number;
    tabs: any;
    scrollBottom: number;
    scrollTop: number;
    hasScrollback: boolean;
    savedY: number;
    savedX: number;
    savedCharset: ICharset | undefined;
    savedCurAttrData: IAttributeData;
    isCursorInViewport: boolean;
    markers: IMarker[];
    translateBufferLineToString(lineIndex: number, trimRight: boolean, startCol?: number, endCol?: number): string;
    getWrappedRangeForLine(y: number): { first: number, last: number };
    nextStop(x?: number): number;
    prevStop(x?: number): number;
    getBlankLine(attr: IAttributeData, isWrapped?: boolean): IBufferLine;
    stringIndexToBufferIndex(lineIndex: number, stringIndex: number, trimRight?: boolean): number[];
    iterator(trimRight: boolean, startIndex?: number, endIndex?: number, startOverscan?: number, endOverscan?: number): IBufferStringIterator;
    getNullCell(attr?: IAttributeData): ICellData;
    getWhitespaceCell(attr?: IAttributeData): ICellData;
    addMarker(y: number): IMarker;
}

export interface IBufferStringIterator {
    hasNext(): boolean;
    next(): IBufferStringIteratorResult;
}

export interface IBufferStringIteratorResult {
    range: { first: number, last: number };
    content: string;
}

export interface ISelectionManager {
    selectionText: string;
    selectionStart: [number, number];
    selectionEnd: [number, number];

    setSelection(row: number, col: number, length: number): any;
}

export interface ICharMeasure {
    width: number;
    height: number;
    measure(): void;
}

export interface IGeometry {
    rows: number;
    cols: number;
}

export interface IBrowser {
    isNode: boolean;
    userAgent: string;
    platform: string;
    isFirefox: boolean;
    isMSIE: boolean;
    isMac: boolean;
    isIpad: boolean;
    isIphone: boolean;
    isMSWindows: boolean;
}

export interface ICircularList<T> extends IEventEmitter<T> {
    length: number;
    maxLength: number;

    forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
    get(index: number): T;
    set(index: number, value: T): void;
    push(value: T): void;
    pop(): T;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    trimStart(count: number): void;
    shiftElements(start: number, count: number, offset: number): void;
}

export interface IColor {
    css: string;
    rgba: number; // 32-bit int with rgba in each byte
}

export interface IColorSet {
    foreground: IColor;
    background: IColor;
    cursor: IColor;
    cursorAccent: IColor;
    selection: IColor;
    ansi: IColor[];
}

export interface IRenderer extends IDisposable {
    /**
     * The dimensions that the renderer will use for things like canvas, cell and
     * character size.
     */
    readonly dimensions: IRenderDimensions;

    /**
     * A method that is called when `window.devicePixelRatio` changes.
     */
    onDevicePixelRatioChange(): void;

    /**
     * A method that is called when the dimenisons of the termnial change.
     */
    onResize(cols: number, rows: number): void;

    /**
     * A method that is called when the terminal loses focus.
     */
    onBlur(): void;

    /**
     * A method that is called when the terminal gains focus.
     */
    onFocus(): void;

    /**
     * A method that is called when the terminal cursor moves, this may be useful
     * for managing the state of a blinking cursor.
     */
    onCursorMove(): void;

    /**
     * A method that is called when terminal options change. Note that changes to
     * the theme should be handled with `IRenderer.onThemeChange`.
     */
    onOptionsChange(): void;

    /**
     * A method that is called when the theme changes.
     */
    onThemeChange(colors: IColorSet): void;

    /**
     * Clears the viewport.
     */
    clear(): void;

    /**
     * Renders the terminal selection. Depending on the renderer, this method
     * should either render the selection or generate a model to be used when
     * `renderRows` is called, for the latter you must return `true` to guarentee
     * `renderRows` will be called even if no rows have changed.
     * @param start The start of the selection in `[x, y]` format.
     * @param end The end of the selection in `[x, y]` format.
     * @param columnSelectMode Whether column select mode is on, if so the
     * selection should be rendered as a square with start being the top-left
     * corner and end being the bottom-right corner.
     * @returns Whether `renderRows` should be triggered (do this if
     * `renderSelection` only generates a model to render in `renderRows`.
     */
    onSelectionChange(start: [number, number], end: [number, number], columnSelectMode: boolean): boolean;

    // TODO: Should buffer be a stripped down view of the world? An iterator? It needs to remain performant.

    /**
     * Renders a range of rows. Calls made to this function are debounced such
     * that they will only be called during an animation frame.
     * @param buffer The terminal buffer on which to render.
     * @param start The first row to render (valid values: `0` to
     * `Terminal.rows - 1`).
     * @param end The last row to render (valid values: `0` to
     * `Terminal.rows - 1`).
     */
    renderRows(buffer: IBuffer, start: number, end: number): void;

    registerCharacterJoiner(handler: (text: string) => [number, number][]): number;
    deregisterCharacterJoiner(joinerId: number): boolean;
}

export interface IRenderDimensions {
    canvasWidth: number;
    canvasHeight: number;
    cellWidth: number;
    cellHeight: number;
    scaledCharWidth: number;
    scaledCharHeight: number;
    scaledCellWidth: number;
    scaledCellHeight: number;
    scaledCharLeft: number;
    scaledCharTop: number;
    scaledCanvasWidth: number;
    scaledCanvasHeight: number;
    actualCellHeight: number
}

export interface IBufferSet extends IDisposable {
    alt: IBuffer;
    normal: IBuffer;
    active: IBuffer;

    onBufferActivate: IEvent<{ activeBuffer: IBuffer, inactiveBuffer: IBuffer }>;

    activateNormalBuffer(): void;
    activateAltBuffer(fillAttr?: IAttributeData): void;
    resize(newCols: number, newRows: number): void;
    setupTabStops(i?: number): void;
}


export interface Terminal extends IDisposable {
    element: HTMLElement;
    rowContainer: HTMLElement;
    selectionContainer: HTMLElement;
    selectionManager: ISelectionManager;
    charMeasure: ICharMeasure;
    textarea: HTMLTextAreaElement;
    rows: number;
    cols: number;
    browser: IBrowser;
    writeBuffer: string[];
    children: HTMLElement[];
    cursorHidden: boolean;
    cursorState: number;
    defAttr: number;
    scrollback: number;
    buffers: IBufferSet;
    buffer: IBuffer;
    renderer: IRenderer;

    handler(data: string): any;
    scrollDisp(disp: number, suppressScrollEvent: boolean): any;
    cancel(ev: Event, force?: boolean): any;
    log(text: string): void;
    showCursor(): void;
    onCursorMove: IEvent<void>;
    onData: IEvent<string>;
    onKey: IEvent<{ key: string, domEvent: KeyboardEvent }>;
    onLineFeed: IEvent<void>;
    onScroll: IEvent<number>;
    onSelectionChange: IEvent<void>;
    onRender: IEvent<{ start: number, end: number }>;
    onResize: IEvent<{ cols: number, rows: number }>;
    onTitleChange: IEvent<string>;
    blur(): void;
    focus(): void;
    on(event: string, callback: (key: any, ev: KeyboardEvent) => void): void;
    off(type: 'blur' | 'focus' | 'linefeed' | 'selection' | 'data' | 'key' | 'keypress' | 'keydown' | 'refresh' | 'resize' | 'scroll' | 'title' | string, listener: (...args: any[]) => void): void;
    emit(type: string, data?: any): void;
    addDisposableListener(type: string, handler: (...args: any[]) => void): IDisposable;
    resize(columns: number, rows: number): void;
    open(parent: HTMLElement): void;
    attachCustomKeyEventHandler(customKeyEventHandler: (event: KeyboardEvent) => boolean): void;
    addCsiHandler(flag: string, callback: (params: number[], collect: string) => boolean): IDisposable;
    addOscHandler(ident: number, callback: (data: string) => boolean): IDisposable;
    registerLinkMatcher(regex: RegExp, handler: (event: MouseEvent, uri: string) => void, options?: ILinkMatcherOptions): number;
    deregisterLinkMatcher(matcherId: number): void;
    registerCharacterJoiner(handler: (text: string) => [number, number][]): number;
    deregisterCharacterJoiner(joinerId: number): void;
    addMarker(cursorYOffset: number): IMarker;
    hasSelection(): boolean;
    getSelection(): string;
    getSelectionPosition(): ISelectionPosition | undefined;
    clearSelection(): void;
    select(column: number, row: number, length: number): void;
    selectAll(): void;
    selectLines(start: number, end: number): void;
    dispose(): void;
    destroy(): void;
    scrollLines(amount: number): void;
    scrollPages(pageCount: number): void;
    scrollToTop(): void;
    scrollToBottom(): void;
    scrollToLine(line: number): void;
    clear(): void;
    write(data: string): void;
    writeln(data: string): void;
    writeUtf8(data: Uint8Array): void;
    getOption(key: 'bellSound' | 'bellStyle' | 'cursorStyle' | 'fontFamily' | 'fontWeight' | 'fontWeightBold' | 'rendererType' | 'termName'): string;
    getOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'debug' | 'disableStdin' | 'enableBold' | 'macOptionIsMeta' | 'rightClickSelectsWord' | 'popOnBell' | 'screenKeys' | 'useFlowControl' | 'visualBell' | 'windowsMode'): boolean;
    getOption(key: 'colors'): string[];
    getOption(key: 'cols' | 'fontSize' | 'letterSpacing' | 'lineHeight' | 'rows' | 'tabStopWidth' | 'scrollback'): number;
    getOption(key: 'handler'): (data: string) => void;
    getOption(key: string): any;
    setOption(key: 'fontFamily' | 'termName' | 'bellSound', value: string): void;
    setOption(key: 'fontWeight' | 'fontWeightBold', value: null | 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'): void;
    setOption(key: 'bellStyle', value: null | 'none' | 'visual' | 'sound' | 'both'): void;
    setOption(key: 'cursorStyle', value: null | 'block' | 'underline' | 'bar'): void;
    setOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'debug' | 'disableStdin' | 'enableBold' | 'macOptionIsMeta' | 'popOnBell' | 'rightClickSelectsWord' | 'screenKeys' | 'useFlowControl' | 'visualBell' | 'windowsMode', value: boolean): void;
    setOption(key: 'colors', value: string[]): void;
    setOption(key: 'fontSize' | 'letterSpacing' | 'lineHeight' | 'tabStopWidth' | 'scrollback', value: number): void;
    setOption(key: 'handler', value: (data: string) => void): void;
    setOption(key: 'theme', value: ITheme): void;
    setOption(key: 'cols' | 'rows', value: number): void;
    setOption(key: string, value: any): void;
    refresh(start: number, end: number): void;
    reset(): void
    applyAddon(addon: any): void;
    loadAddon(addon: ITerminalAddon): void;
    prompt(): void;
    setTheme(option: any): void;
    fit(): void;
    proposeGeometry(): IGeometry
}
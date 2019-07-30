import { IEventEmitter, IDisposable, IBuffer, IMarker, ILocalizableStrings, ITerminalOptions, IEvent, ILinkMatcherOptions, ISelectionPosition, ITheme, ITerminalAddon } from 'xterm';

export interface ITerminalApp extends IEventEmitter, IDisposable {
  /**
   * The element containing the terminal.
   */
  readonly element: HTMLElement;

  /**
   * The textarea that accepts input for the terminal.
   */
  readonly textarea: HTMLTextAreaElement;

  /**
   * The number of rows in the terminal's viewport. Use
   * `ITerminalOptions.rows` to set this in the constructor and
   * `Terminal.resize` for when the terminal exists.
   */
  readonly rows: number;

  /**
   * The number of columns in the terminal's viewport. Use
   * `ITerminalOptions.cols` to set this in the constructor and
   * `Terminal.resize` for when the terminal exists.
   */
  readonly cols: number;

  /**
   * (EXPERIMENTAL) The terminal's current buffer, this might be either the
   * normal buffer or the alt buffer depending on what's running in the
   * terminal.
   */
  readonly buffer: IBuffer;

  /**
   * (EXPERIMENTAL) Get all markers registered against the buffer. If the alt
   * buffer is active this will always return [].
   */
  readonly markers: ReadonlyArray<IMarker>;

  /**
   * Natural language strings that can be localized.
   */
  strings: ILocalizableStrings;

  /**
   * Creates a new `Terminal` object.
   *
   * @param options An object containing a set of options.
   */
  constructor(options?: ITerminalOptions);

  /**
   * Adds an event listener for the cursor moves.
   * @returns an `IDisposable` to stop listening.
   */
  onCursorMove: IEvent<void>;

  /**
   * Adds an event listener for when a data event fires. This happens for
   * example when the user types or pastes into the terminal. The event value
   * is whatever `string` results, in a typical setup, this should be passed
   * on to the backing pty.
   * @returns an `IDisposable` to stop listening.
   */
  onData: IEvent<string>;

  /**
   * Adds an event listener for a key is pressed. The event value contains the
   * string that will be sent in the data event as well as the DOM event that
   * triggered it.
   * @returns an `IDisposable` to stop listening.
   */
  onKey: IEvent<{ key: string, domEvent: KeyboardEvent }>;

  /**
   * Adds an event listener for when a line feed is added.
   * @returns an `IDisposable` to stop listening.
   */
  onLineFeed: IEvent<void>;

  /**
   * Adds an event listener for when a scroll occurs. The  event value is the
   * new position of the viewport.
   * @returns an `IDisposable` to stop listening.
   */
  onScroll: IEvent<number>;

  /**
   * Adds an event listener for when a selection change occurs.
   * @returns an `IDisposable` to stop listening.
   */
  onSelectionChange: IEvent<void>;

  /**
   * Adds an event listener for when rows are rendered. The event value
   * contains the start row and end rows of the rendered area (ranges from `0`
   * to `Terminal.rows - 1`).
   * @returns an `IDisposable` to stop listening.
   */
  onRender: IEvent<{ start: number, end: number }>;

  /**
   * Adds an event listener for when the terminal is resized. The event value
   * contains the new size.
   * @returns an `IDisposable` to stop listening.
   */
  onResize: IEvent<{ cols: number, rows: number }>;

  /**
   * Adds an event listener for when an OSC 0 or OSC 2 title change occurs.
   * The event value is the new title.
   * @returns an `IDisposable` to stop listening.
   */
  onTitleChange: IEvent<string>;

  /**
   * Unfocus the terminal.
   */
  blur(): void;

  /**
   * Focus the terminal.
   */
  focus(): void;

  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'blur' | 'focus' | 'linefeed' | 'selection', listener: () => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'data', listener: (...args: any[]) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'key', listener: (key: string, event: KeyboardEvent) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'keypress' | 'keydown', listener: (event: KeyboardEvent) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'refresh', listener: (data: { start: number, end: number }) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'resize', listener: (data: { cols: number, rows: number }) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'scroll', listener: (ydisp: number) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: 'title', listener: (title: string) => void): void;
  /**
   * Registers an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  on(type: string, listener: (...args: any[]) => void): void;

  /**
   * Deregisters an event listener.
   * @param type The type of the event.
   * @param listener The listener.
   * @deprecated use `Terminal.onEvent(listener).dispose()` instead.
   */
  off(type: 'blur' | 'focus' | 'linefeed' | 'selection' | 'data' | 'key' | 'keypress' | 'keydown' | 'refresh' | 'resize' | 'scroll' | 'title' | string, listener: (...args: any[]) => void): void;

  /**
   * Emits an event on the terminal.
   * @param type The type of event
   * @param data data associated with the event.
   * @deprecated This is being removed from the API with no replacement, see
   * issue #1505.
   */
  emit(type: string, data?: any): void;

  /**
   * Adds an event listener to the Terminal, returning an IDisposable that can
   * be used to conveniently remove the event listener.
   * @param type The type of event.
   * @param handler The event handler.
   * @deprecated use `Terminal.onEvent(listener)` instead.
   */
  addDisposableListener(type: string, handler: (...args: any[]) => void): IDisposable;

  /**
   * Resizes the terminal. It's best practice to debounce calls to resize,
   * this will help ensure that the pty can respond to the resize event
   * before another one occurs.
   * @param x The number of columns to resize to.
   * @param y The number of rows to resize to.
   */
  resize(columns: number, rows: number): void;

  /**
   * Opens the terminal within an element.
   * @param parent The element to create the terminal within. This element
   * must be visible (have dimensions) when `open` is called as several DOM-
   * based measurements need to be performed when this function is called.
   */
  open(parent: HTMLElement): void;

  /**
   * Attaches a custom key event handler which is run before keys are
   * processed, giving consumers of xterm.js ultimate control as to what keys
   * should be processed by the terminal and what keys should not.
   * @param customKeyEventHandler The custom KeyboardEvent handler to attach.
   * This is a function that takes a KeyboardEvent, allowing consumers to stop
   * propagation and/or prevent the default action. The function returns
   * whether the event should be processed by xterm.js.
   */
  attachCustomKeyEventHandler(customKeyEventHandler: (event: KeyboardEvent) => boolean): void;

  /**
   * (EXPERIMENTAL) Adds a handler for CSI escape sequences.
   * @param flag The flag should be one-character string, which specifies the
   * final character (e.g "m" for SGR) of the CSI sequence.
   * @param callback The function to handle the escape sequence. The callback
   * is called with the numerical params, as well as the special characters
   * (e.g. "$" for DECSCPP). Return true if the sequence was handled; false if
   * we should try a previous handler (set by addCsiHandler or setCsiHandler).
   * The most recently-added handler is tried first.
   * @return An IDisposable you can call to remove this handler.
   */
  addCsiHandler(flag: string, callback: (params: number[], collect: string) => boolean): IDisposable;

  /**
   * (EXPERIMENTAL) Adds a handler for OSC escape sequences.
   * @param ident The number (first parameter) of the sequence.
   * @param callback The function to handle the escape sequence. The callback
   * is called with OSC data string. Return true if the sequence was handled;
   * false if we should try a previous handler (set by addOscHandler or
   * setOscHandler). The most recently-added handler is tried first.
   * @return An IDisposable you can call to remove this handler.
   */
  addOscHandler(ident: number, callback: (data: string) => boolean): IDisposable;

  /**
   * (EXPERIMENTAL) Registers a link matcher, allowing custom link patterns to
   * be matched and handled.
   * @param regex The regular expression to search for, specifically this
   * searches the textContent of the rows. You will want to use \s to match a
   * space ' ' character for example.
   * @param handler The callback when the link is called.
   * @param options Options for the link matcher.
   * @return The ID of the new matcher, this can be used to deregister.
   */
  registerLinkMatcher(regex: RegExp, handler: (event: MouseEvent, uri: string) => void, options?: ILinkMatcherOptions): number;

  /**
   * (EXPERIMENTAL) Deregisters a link matcher if it has been registered.
   * @param matcherId The link matcher's ID (returned after register)
   */
  deregisterLinkMatcher(matcherId: number): void;

  /**
   * (EXPERIMENTAL) Registers a character joiner, allowing custom sequences of
   * characters to be rendered as a single unit. This is useful in particular
   * for rendering ligatures and graphemes, among other things.
   *
   * Each registered character joiner is called with a string of text
   * representing a portion of a line in the terminal that can be rendered as
   * a single unit. The joiner must return a sorted array, where each entry is
   * itself an array of length two, containing the start (inclusive) and end
   * (exclusive) index of a substring of the input that should be rendered as
   * a single unit. When multiple joiners are provided, the results of each
   * are collected. If there are any overlapping substrings between them, they
   * are combined into one larger unit that is drawn together.
   *
   * All character joiners that are registered get called every time a line is
   * rendered in the terminal, so it is essential for the handler function to
   * run as quickly as possible to avoid slowdowns when rendering. Similarly,
   * joiners should strive to return the smallest possible substrings to
   * render together, since they aren't drawn as optimally as individual
   * characters.
   *
   * NOTE: character joiners are only used by the canvas renderer.
   *
   * @param handler The function that determines character joins. It is called
   * with a string of text that is eligible for joining and returns an array
   * where each entry is an array containing the start (inclusive) and end
   * (exclusive) indexes of ranges that should be rendered as a single unit.
   * @return The ID of the new joiner, this can be used to deregister
   */
  registerCharacterJoiner(handler: (text: string) => [number, number][]): number;

  /**
   * (EXPERIMENTAL) Deregisters the character joiner if one was registered.
   * NOTE: character joiners are only used by the canvas renderer.
   * @param joinerId The character joiner's ID (returned after register)
   */
  deregisterCharacterJoiner(joinerId: number): void;

  /**
   * (EXPERIMENTAL) Adds a marker to the normal buffer and returns it. If the
   * alt buffer is active, undefined is returned.
   * @param cursorYOffset The y position offset of the marker from the cursor.
   */
  addMarker(cursorYOffset: number): IMarker;

  /**
   * Gets whether the terminal has an active selection.
   */
  hasSelection(): boolean;

  /**
   * Gets the terminal's current selection, this is useful for implementing
   * copy behavior outside of xterm.js.
   */
  getSelection(): string;

  /**
   * Gets the selection position or undefined if there is no selection.
   */
  getSelectionPosition(): ISelectionPosition | undefined;

  /**
   * Clears the current terminal selection.
   */
  clearSelection(): void;

  /**
   * Selects text within the terminal.
   * @param column The column the selection starts at..
   * @param row The row the selection starts at.
   * @param length The length of the selection.
   */
  select(column: number, row: number, length: number): void;

  /**
   * Selects all text within the terminal.
   */
  selectAll(): void;

  /**
   * Selects text in the buffer between 2 lines.
   * @param start The 0-based line index to select from (inclusive).
   * @param end The 0-based line index to select to (inclusive).
   */
  selectLines(start: number, end: number): void;

  /*
   * Disposes of the terminal, detaching it from the DOM and removing any
   * active listeners.
   */
  dispose(): void;

  /**
   * Destroys the terminal and detaches it from the DOM.
   *
   * @deprecated Use dispose() instead.
   */
  destroy(): void;

  /**
   * Scroll the display of the terminal
   * @param amount The number of lines to scroll down (negative scroll up).
   */
  scrollLines(amount: number): void;

  /**
   * Scroll the display of the terminal by a number of pages.
   * @param pageCount The number of pages to scroll (negative scrolls up).
   */
  scrollPages(pageCount: number): void;

  /**
   * Scrolls the display of the terminal to the top.
   */
  scrollToTop(): void;

  /**
   * Scrolls the display of the terminal to the bottom.
   */
  scrollToBottom(): void;

  /**
   * Scrolls to a line within the buffer.
   * @param line The 0-based line index to scroll to.
   */
  scrollToLine(line: number): void;

  /**
   * Clear the entire buffer, making the prompt line the new first line.
   */
  clear(): void;

  /**
   * Writes text to the terminal.
   * @param data The text to write to the terminal.
   */
  write(data: string): void;

  /**
   * Writes text to the terminal, followed by a break line character (\n).
   * @param data The text to write to the terminal.
   */
  writeln(data: string): void;

  /**
   * Writes UTF8 data to the terminal.
   * This has a slight performance advantage over the string based write method
   * due to lesser data conversions needed on the way from the pty to xterm.js.
   * @param data The data to write to the terminal.
   */
  writeUtf8(data: Uint8Array): void;

  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: 'bellSound' | 'bellStyle' | 'cursorStyle' | 'fontFamily' | 'fontWeight' | 'fontWeightBold' | 'rendererType' | 'termName'): string;
  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'debug' | 'disableStdin' | 'enableBold' | 'macOptionIsMeta' | 'rightClickSelectsWord' | 'popOnBell' | 'screenKeys' | 'useFlowControl' | 'visualBell' | 'windowsMode'): boolean;
  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: 'colors'): string[];
  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: 'cols' | 'fontSize' | 'letterSpacing' | 'lineHeight' | 'rows' | 'tabStopWidth' | 'scrollback'): number;
  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: 'handler'): (data: string) => void;
  /**
   * Retrieves an option's value from the terminal.
   * @param key The option key.
   */
  getOption(key: string): any;

  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'fontFamily' | 'termName' | 'bellSound', value: string): void;
  /**
  * Sets an option on the terminal.
  * @param key The option key.
  * @param value The option value.
  */
  setOption(key: 'fontWeight' | 'fontWeightBold', value: null | 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'bellStyle', value: null | 'none' | 'visual' | 'sound' | 'both'): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'cursorStyle', value: null | 'block' | 'underline' | 'bar'): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'allowTransparency' | 'cancelEvents' | 'convertEol' | 'cursorBlink' | 'debug' | 'disableStdin' | 'enableBold' | 'macOptionIsMeta' | 'popOnBell' | 'rightClickSelectsWord' | 'screenKeys' | 'useFlowControl' | 'visualBell' | 'windowsMode', value: boolean): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'colors', value: string[]): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'fontSize' | 'letterSpacing' | 'lineHeight' | 'tabStopWidth' | 'scrollback', value: number): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'handler', value: (data: string) => void): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'theme', value: ITheme): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: 'cols' | 'rows', value: number): void;
  /**
   * Sets an option on the terminal.
   * @param key The option key.
   * @param value The option value.
   */
  setOption(key: string, value: any): void;

  /**
   * Tells the renderer to refresh terminal content between two rows
   * (inclusive) at the next opportunity.
   * @param start The row to start from (between 0 and this.rows - 1).
   * @param end The row to end at (between start and this.rows - 1).
   */
  refresh(start: number, end: number): void;

  /**
   * Perform a full reset (RIS, aka '\x1bc').
   */
  reset(): void

  /**
   * Applies an addon to the Terminal prototype, making it available to all
   * newly created Terminals.
   * @param addon The addon to apply.
   * @deprecated Use the new loadAddon API/addon format.
   */
  applyAddon(addon: any): void;

  /**
   * (EXPERIMENTAL) Loads an addon into this instance of xterm.js.
   * @param addon The addon to load.
   */
  loadAddon(addon: ITerminalAddon): void;

  prompt(): void;

  setTheme(option: any): void;

  fit(): void;
}

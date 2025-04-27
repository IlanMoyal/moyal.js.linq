/**
 * A console-like printer that logs into a specified HTML container.
 * Each log entry is appended as a div with appropriate class names.
 */
moyal.test.HtmlConsolePrinter = class  {
    /**
     * @param {HTMLElement} container - The DOM element where logs will be appended.
     */
    constructor(container) {
      if (!(container instanceof HTMLElement)) {
        throw new Error("container must be an HTMLElement");
      }
      this._container = container;
    }
  
    _append(message, type = "log", color = null, ...args) {
      const entry = document.createElement("div");
      entry.className = `console-entry ${type}`;
      if (color) entry.style.color = color;
      entry.textContent = message;
  
      if (args?.length > 0) {
        const extra = document.createElement("pre");
        extra.className = `console-args ${type}`;
        extra.textContent = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(" ");
        entry.appendChild(extra);
      }
  
      this._container.appendChild(entry);
    }
  
    log(message, color, ...args) { this._append(message, "log", color, ...args); }
    info(message, color, ...args) { this._append(message, "info", color, ...args); }
    warn(message, color, ...args) { this._append(message, "warn", color, ...args); }
    error(message, color, ...args) { this._append(message, "error", color, ...args); }
  
    group(label, color) {
      const groupLabel = document.createElement("div");
      groupLabel.className = "console-group";
      groupLabel.textContent = `▼ ${label}`;
      if (color) groupLabel.style.color = color;
      this._container.appendChild(groupLabel);
    }
  
    groupCollapsed(label, color) {
      const groupLabel = document.createElement("details");
      groupLabel.className = "console-group-collapsed";
      groupLabel.open = false;
  
      const summary = document.createElement("summary");
      summary.textContent = label;
      if (color) summary.style.color = color;
  
      groupLabel.appendChild(summary);
      this._container.appendChild(groupLabel);
  
      // Redirect future logs here if desired
    }
  
    groupEnd() {
      // No-op for now — real grouping structure would need a stack
    }
  }

  class HtmlConsolePrinter {
	constructor(container) {
	  if (!(container instanceof HTMLElement)) {
		throw new Error("container must be an HTMLElement");
	  }
	  this._container = container;
	  this._initStyles();
	}
  
	_initStyles() {
	  const style = document.createElement("style");
	  style.textContent = `
		.console-entry {
		  font-family: monospace;
		  white-space: pre-wrap;
		  padding: 2px 6px;
		  margin: 2px 0;
		  border-left: 3px solid transparent;
		}
  
		.console-entry.log    { color: inherit; }
		.console-entry.info   { color: blue; }
		.console-entry.warn   { color: orange; border-left-color: orange; }
		.console-entry.error  { color: red; font-weight: bold; border-left-color: red; }
  
		.console-args {
		  font-size: 0.9em;
		  margin-left: 1em;
		  color: #666;
		}
  
		.console-group {
		  font-weight: bold;
		  margin-top: 6px;
		}
  
		.console-group-collapsed summary {
		  cursor: pointer;
		  font-weight: bold;
		  margin-top: 6px;
		}
  
		.console-group-collapsed {
		  margin-bottom: 6px;
		  padding-left: 1em;
		}
	  `;
	  this._container.prepend(style);
	}
  
	// ...rest of the methods remain the same
  }
  
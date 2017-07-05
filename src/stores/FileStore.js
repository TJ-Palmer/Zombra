import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import uuid from 'uuid';

class FileStore extends EventEmitter {
  constructor() {
    super();
    this.lastFileUpdated = null;
    this.activeFile = '0';
    this.files = [
      {
        name: 'untitled',
        type: 'txt',
        id: '0',
        lines: ["","",""],
      },
    ];
  }

  setActiveFile(id) {
    this.activeFile = id;
    this.emit('change');
  }

  getActiveFile() {
    return this.activeFile;
  }

  createNewFile(name, type) {
    let file = {
      name: name,
      type: type,
      id: uuid.v4(),
      lines: ["","",""],
    }
    this.files.push(file);
    this.emit('change');
  }

  // createNewFile(file) {
  //   if (!this.files.find(f => f.id === file.id)) {
  //     this.files.push(file);
  //     return true;
  //   }
  //   return false;
  // }

  getAllFiles() {
    return this.files;
  }

  getFileChanged() {
    return this.lastFileUpdated;
  }

  getFile(fileId) {
    return this.files[this.files.findIndex(f => f.id === fileId)];
  }

  updateLineText(lineNumber, text) {
    let fileIndex = this.files.findIndex(f => f.id === this.activeFile);
    let file = this.files[fileIndex];
    let lineIndex = lineNumber - 1;
    file.lines[lineIndex] = text;

    this.lastFileUpdated = this.activeFile;

    this.emit('change');
  }

  createNewLine(lineNumber) {
    let fileIndex = this.files.findIndex(f => f.id === this.activeFile);
    let file = this.files[fileIndex];
    let lineIndex = lineNumber - 1;

    if (file.lines.length === 0 || file.lines.length === lineNumber) {
      file.lines.push('')
    } else {
      for (var i = file.lines.length; i >= lineIndex; i--) {
        file.lines[i] = file.lines[i-1];
      }
      file.lines[lineIndex] = '';
    }

    this.lastFileUpdated = this.activeFile;

    this.emit('change');
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_LINE': {
        this.createNewLine(action.lineNumber);
        break;
      }
      case 'CREATE_FILE': {
        this.createNewFile(action.name, action.fileType);
        break;
      }
      case 'UPDATE_LINE': {
        this.updateLineText(action.lineNumber, action.text);
        break;
      }
      case 'SET_ACTIVEFILE': {
        this.setActiveFile(action.id);
        break;
      }
      default: {
        console.log("no action found");
      }
    }
  }
}

const fileStore = new FileStore();
dispatcher.register(fileStore.handleActions.bind(fileStore));
window.dispatcher = dispatcher;
window.fileStore = fileStore;
export default fileStore;

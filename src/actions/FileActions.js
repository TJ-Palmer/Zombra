import dispatcher from '../dispatcher';

export function createNewLine(lineNumber) {
  dispatcher.dispatch({
    type: 'CREATE_LINE',
    lineNumber: lineNumber,
  });
}

export function updateLineText(lineNumber, text) {
  dispatcher.dispatch({
    type: 'UPDATE_LINE',
    lineNumber: lineNumber,
    text: text,
  });
}

export function createNewFile(name, fileType) {
  dispatcher.dispatch({
    type: 'CREATE_FILE',
    name: name,
    fileType: fileType,
  });
}

export function setActiveFile(id) {
  dispatcher.dispatch({
    type: 'SET_ACTIVEFILE',
    id: id,
  });
}

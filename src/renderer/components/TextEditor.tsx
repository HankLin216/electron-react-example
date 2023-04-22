import {
  Editor,
  EditorState,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
  ContentBlock,
} from 'draft-js';
import React, { useEffect, useRef } from 'react';
import 'draft-js/dist/Draft.css';
import Paper from 'renderer/components/dev/StyledPaper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';
import ILog from 'types/Log';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { ActionEnum } from 'enum/Action';
import SystemLogListState from '../../states/SystemLogState';

// #region handle data time strategy
// 2023-04-10 02:03:12
const HANDLE_DATETIME_REGEX = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g;

const findHandleDateTimeEntities = (
  contentBlock: ContentBlock,
  // eslint-disable-next-line no-unused-vars
  callback: (start: number, end: number) => void,
  // eslint-disable-next-line no-unused-vars
  contentState: ContentState
) => {
  const text = contentBlock.getText();
  let matchArr: RegExpExecArray | null;

  do {
    matchArr = HANDLE_DATETIME_REGEX.exec(text);
    if (matchArr) {
      const start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  } while (matchArr != null);
};

interface HandleDateTimeProps {
  children: React.ReactNode;
}

function HandleDateTime({ children }: HandleDateTimeProps) {
  return <span style={{ backgroundColor: '#FFF000' }}>{children}</span>;
}
// #endregion

// #region handle message stratgy
const enumKeys = Object.keys(ActionEnum).filter((key) =>
  Number.isNaN(parseInt(key, 10))
);
const enumStrings = `(${enumKeys.join('|')})`;

const HANDLE_MESSAGE_REGEX = new RegExp(
  `LEVEL_${enumStrings}_(?:(?!LEVEL_END)[\\s\\S])+LEVEL_END`,
  'g'
);

const findMessageEntities = (
  contentBlock: ContentBlock,
  // eslint-disable-next-line no-unused-vars
  callback: (start: number, end: number) => void,
  // eslint-disable-next-line no-unused-vars
  contentState: ContentState
) => {
  const text = contentBlock.getText();
  let matchArr: RegExpExecArray | null;

  do {
    matchArr = HANDLE_MESSAGE_REGEX.exec(text);
    if (matchArr) {
      const start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  } while (matchArr != null);
};

interface HandleMessageProps {
  children: React.ReactNode;
  decoratedText: string;
}

function HandleMessage({ children, decoratedText }: HandleMessageProps) {
  const matchArr = HANDLE_MESSAGE_REGEX.exec(decoratedText);
  const decorateMsg = matchArr[0];
  const levelStr = matchArr[1];

  const msg = decorateMsg
    .replace(`LEVEL_${levelStr}_`, '')
    .replace('_LEVEL_END', '');
  return <span style={{ backgroundColor: 'blue' }}>{msg}</span>;
}
// #endregion

function TextEditor() {
  const [systemLogList, setSystemLogList] =
    useRecoilState<ILog[]>(SystemLogListState);

  // convert logs data to editorState
  const systemLogHTMLContent = systemLogList
    .slice(-100)
    .map(
      (m) =>
        `<p>${moment(m.time).format('YYYY-MM-DD hh:mm:ss')} LEVEL_${
          ActionEnum[m.level]
        }_${m.messgae}_LEVEL_END</p>`
    )
    .join('');
  const blocksFromHTML = convertFromHTML(systemLogHTMLContent);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: findHandleDateTimeEntities,
      component: HandleDateTime,
    },
    {
      strategy: findMessageEntities,
      component: HandleMessage,
    },
  ]);
  const editorState = EditorState.createWithContent(
    contentState,
    compositeDecorator
  );

  // counter
  const renderCounter = useRef(0);
  renderCounter.current += 1;

  // subscribe systemLogList
  useEffect(() => {
    window.electron.ipcRenderer.on('system-message', (log) => {
      setSystemLogList((logs) => [...logs, log as ILog]);
    });
  }, [setSystemLogList]);

  return (
    <Paper
      square
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '.DraftEditor-root': {
          flex: '1 0 0px',
          overflowY: 'auto',
        },
      }}
    >
      <Typography
        align="center"
        sx={{
          fontWeight: 900,
          color: `${grey[900]}`,
        }}
      >
        System Message, count:{renderCounter.current}
      </Typography>
      <Divider />
      <Editor editorState={editorState} readOnly onChange={() => {}} />
    </Paper>
  );
}

export default TextEditor;

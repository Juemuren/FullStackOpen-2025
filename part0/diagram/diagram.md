# part1

[题目链接](https://fullstackopen.com/zh/part0/web_%E5%BA%94%E7%94%A8%E7%9A%84%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD#%E7%BB%83%E4%B9%A0-0-1-0-6)  
图表使用[Mermaid](https://mermaid.js.org/)创建

## 0.4

创建一个图表，描述当用户把东西写进文本字段并点击submit按钮，随后创建了一个新笔记的情况。
网址为 https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: 302 text/html
    Note over browser, server: browser redircet
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: 200 text/html
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: 200 text/css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: 200 application/javascript
    Note over browser, server: browser execute main.js code that fetches JSON from server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: 200 application/json
    Note over browser, server: browser execute main.js callback function that renders the notes
```

## 0.5

创建一个图表，描述用户进入单页应用版本的笔记应用的情况。
网址为 https://studies.cs.helsinki.fi/exampleapp/spa

```mermaid
sequenceDiagram
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: 200 text/html
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: 200 text/css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: 200 application/javascript
    Note over browser, server: browser execute spa.js code that fetches JSON from server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: 200 application/json
    Note over browser, server: browser execute spa.js callback function that renders the notes
```

## 0.6

创建一个图表，描述用户使用单页版应用创建新笔记的情况。
网址为 https://studies.cs.helsinki.fi/exampleapp/spa

```mermaid
sequenceDiagram
    Note over browser, server: browser execute spa.js submit function that creates a new note
    Note over browser, server: browser execute spa.js redraw function that renders the notes
    Note over browser, server: browser execute spa.js send function that send new note to server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: 201 application/json
```
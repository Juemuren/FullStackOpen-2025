# 0.4

创建一个图表，描述用户创建一个新笔记的情况。
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

# 0.5

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

# 0.6

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
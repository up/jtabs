(function (win, doc) {

  var tab_container;

  function newElement(name) {
    return doc.createElement(name);
  }

  function getAll(selector) {
    return doc.querySelectorAll(selector);
  }

  function toggleTabs(tab) {
    var
      i, lis = getAll("#tabs li"),
      tas = getAll("#tabs #tabContent div")
    ;
    for (i = 0; i < lis.length; i++) {
      lis[i].className = "";
    }
    for (i = 0; i < tas.length; i++) {
      tas[i].style.display = 'none';
    }
    tab.className = "selected";
    tas[parseInt(tab.id.substring(3), 10) - 1].style.display = 'block';
  }

  function createListItem(id, title, sel) {
    var li = newElement('li');
    li.innerHTML = title;
    li.id = id;
    li.onclick = function () {
      toggleTabs(this);
    };
    if (sel) {
      li.className = "selected";
    }
    return li;
  }

  function addStyleRules(rules) {
    var
      head = doc.getElementsByTagName('head')[0],
      style = newElement('style')
    ;
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = rules;
    } else {
      style.appendChild(doc.createTextNode(rules));
    }
    head.appendChild(style);
  }

  function createTabContentWrapper(content, hide) {
    var div = newElement('div');
    div.innerHTML = content;
    if (hide) {
      div.style.display = 'none';
    }
    return div;
  }

  function appendTo(target) {
    target.appendChild(tab_container);
  }

  function create() {
    var
      args = arguments,
      len = args.length,
      tab_ul = newElement('ul'),
      tab_content = newElement('div')
    ;
    tab_container = newElement('div');
    tab_container.id = "tabs";
    tab_ul.id = "sidebarTabs";
    tab_container.appendChild(tab_ul);
    for (i = 0; i < len; i++) {
      tab_ul.appendChild(createListItem('tab' + (i + 1), args[i][0], i === 0 ? true : false));
    }
    tab_content.id = "tabContent";
    tab_container.appendChild(tab_content);
    for (i = 0; i < len; i++) {
      tab_content.appendChild(createTabContentWrapper(args[i][1], i > 0 ? true : false));
    }
    return this; // chaining
  }

	addStyleRules(
    'body { background-color:#222; }' +
    '#tabs{ margin:10px 0; width:400px; }' +
    '#tabs ul { list-style:none; display:block; overflow:hidden; margin:0; padding:0; position: relative; top:1px;}' +
    '#tabs li { ' +
    '  float:left; border:1px solid #444; padding:5px 8px; cursor:pointer; border-bottom:none; margin-right:10px;' +
    '  font-family:verdana; font-size:.8em; font-weight:bold; color:#AAA; ' +
    '}' +
    '#tabs .selected{ background-color:#444; color:#EEE; }' +
    '#tabs #tabContent div { padding:10px; color:#EEE; background-color:#444; overflow:hidden; width:93%;}'
	);

  win['jtabs'] = {};
  win['jtabs']['create'] = create;
  win['jtabs']['appendTo'] = appendTo;

}(window, document));

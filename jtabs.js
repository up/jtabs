// ==ClosureCompiler==
// @output_file_name jtabs.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

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

  win['jtabs'] = {};
  win['jtabs']['create'] = create;
  win['jtabs']['appendTo'] = appendTo;

}(window, document));

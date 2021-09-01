const _ = require('lodash');

const textareaElem = document.querySelector('textarea');
const resultElem = document.querySelector('.result');
const buildJSONButton = document.querySelector('.build-button');

export const visualizerApp = () => {
  const getJSONInfo = () => {
    const text = textareaElem.value;
    try {
        const json = JSON.parse(text);
        if(typeof json !== 'object') {
            alert('Should be an object');
            return false;
        }
        drawJSONTree(json);
    } catch  {
        alert("It isn't a JSON");
        console.log('error', e);
    }
  }

  const drawJSONTree = (data) => {
      const type = Array.isArray(data) ? `[ ]`: `{ }`;
      const result = [`<div class="main-elem">Big Object: ${type}`];
      result.push(drawElementsTree(data));
      resultElem.innerHTML = result.join('');
      const dataElem = document.querySelectorAll('.data-elem');
      dataElem.forEach(elem => {
          elem.addEventListener('click', (event) => {
              event.stopImmediatePropagation();
              elem.classList.toggle('hide');
          });
      })
  }

  const drawElementsTree = (data) => {
      const result = [`<div class="wrapper">`];
      for (let [key, value] of Object.entries(data)) {
          if (typeof value === 'object') {
              const type = Array.isArray(value) ? `[ ]`: `{}`;
              result.push(`<div class="data-elem">${key} ${type}:`);
              result.push(drawElementsTree(value));
              result.push(`</div>`)
          } else {
              const valueStyle = addValueColor(value);
              result.push(
                  `<div class="simple-elem">${key}:
                      <span class=${valueStyle}>${value}</span>
                  </div>`
              );
          }
      }
      result.push('</div>');
      return result.join('');
  }

  const addValueColor = (value) => {
      let type = typeof value;
      type = value === null ? 'null' : type;
      switch(type) {
          case 'number':
              return 'green-color';
          case 'string':
              return 'blue-color';
          case 'boolean':
              return 'red-color';
          default:
              return 'default-color';
      }
  }

  buildJSONButton.addEventListener('click', getJSONInfo);
}

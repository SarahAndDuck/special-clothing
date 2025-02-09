let req = new XMLHttpRequest();
let people = {}
let mySaveSVC = JSON.parse(localStorage.getItem('svch'));


function ready() {
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      people = JSON.parse(req.responseText)
    }
  };

  req.open("GET", "https://api.jsonbin.io/v3/b/67a83a6bad19ca34f8fca03e?meta=false >", true);
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  req.send();

  // if (mySaveSVC == true) {
  //   console.log(mySaveSVC);
  //   alert('с этого устройства уже отправлены данные')
  //   document.querySelectorAll('input[type="text"]').forEach(input => input.classList.remove('empty'))
  //   document.querySelectorAll('input').forEach(input => input.setAttribute('disabled', ''))
  // }
}
document.addEventListener("DOMContentLoaded", ready);



const INPUTS = document.querySelectorAll('input[type="text"]')
const BODY = document.querySelector('.body')
const OVERLAY = document.querySelector('.overlay')
const MODAL = document.querySelector('.modal')
const BTN_CLOSE_MODAL = MODAL.querySelector('.modal__btn-close')
const MODAL_TABLE = document.querySelector('.modal-table')
const BTN_CLOSE_MODAL_TABLE = MODAL_TABLE.querySelector('.modal__btn-close')



function toggleModal(el) {
  BODY.classList.toggle(el)
  OVERLAY.classList.toggle(el)
  MODAL.classList.toggle(el)
}
function toggleModalTable(el) {
  BODY.classList.toggle(el)
  OVERLAY.classList.toggle(el)
  MODAL_TABLE.classList.toggle(el)
}

BTN_CLOSE_MODAL.addEventListener('click', btnCloseModalHandler)
function btnCloseModalHandler() {
  toggleModal('modal-open')
}
BTN_CLOSE_MODAL_TABLE.addEventListener('click', btnCloseModalTableHandler)
function btnCloseModalTableHandler() {
  toggleModalTable('modal-open')
  MODAL_TABLE.querySelector('.table').innerHTML = ''
}
function inputHandler(e) {
  if (e.target.value !== '') {
    e.target.classList.remove('empty')
  }
  else { e.target.classList.add('empty') }
}
INPUTS.forEach(input => input.addEventListener('input', inputHandler))



function getHundler() {
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      // console.log(req.responseText);
      people = JSON.parse(req.responseText)
      toggleModalTable('modal-open')
      console.log(people.record);
      const table = document.createElement('div');
      table.classList.add('table')
      MODAL_TABLE.prepend(table)
      for (let i = 0; i < people.record.length; i++) {
        const row = document.createElement('div');
        row.classList.add('row')
        table.append(row)
        const men = Object.values(people.record[i])
        for (let j = 0; j < 6; j++) {
          const column = document.createElement('div');
          column.classList.add('column')
          if (j === 0) {
            column.textContent = `${1 + +men[j]}   | `
          }
          else if (j === 3) {
            column.textContent = `| Рамер одежды:${men[j]}`
          }
          else if (j === 4) {
            column.textContent = `| Рамер обуви:${men[j]}`
          }
          else if (j === 5) {
            column.textContent = `| Рост:${men[j]}`
          }
          else { column.textContent = `${men[j]}` }
          row.append(column)
        }
      }
    }
  };

  req.open("GET", "https://api.jsonbin.io/v3/b/67a83a6bad19ca34f8fca03e?meta=false >", true);
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  req.send();

}



document.querySelector('#create').addEventListener('click', function () {
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);

    }
  };

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  // req.send('[{"name": "Иван","surname": "Сидоров","clothing-size": "s", "shoe-size": "42"}]');
  req.send('[{"id":"0","name": "Ирина","surname": "Раткевич","clothingSize": "42/s", "shoeSize": "33","height":"155"}]');
})


document.querySelector('#get').addEventListener('click', getHundler)



document.querySelector('#update').addEventListener('click', function (event) {
  let isOk = true
  event.preventDefault()
  INPUTS.forEach(input => {
    if (input.value === '') {
      isOk = false
    }

  })
  if (!isOk) {
    alert('не все поля заполнены!')
  }
  if (isOk) {
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {

      }
    };
    const ID = people.record[people.record.length - 1]["id"]
    let myObg =
    {
      "id": `${+ID + 1}`,
      "name": `${document.querySelector('#name').value}`,
      "surname": `${document.querySelector('#surname').value}`,
      "clothingSize": ` ${document.querySelector('#clothing-size').value}`,
      "shoeSize": ` ${document.querySelector('#shoe-size').value}`,
      "height": `${document.querySelector('#height').value}`

    }

    people.record.push(myObg)
    let json = JSON.stringify(people.record);
    req.open("PUT", "https://api.jsonbin.io/v3/b/67a83a6bad19ca34f8fca03e", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
    req.send(`${json}`);

    if (localStorage.getItem('svch') === null) {
      localStorage.setItem('svch', JSON.stringify(true))
    }

    toggleModal('modal-open')
    INPUTS.forEach(i => i.setAttribute('disabled', ''))
    document.querySelector('#update').setAttribute('disabled', '')
  }

})





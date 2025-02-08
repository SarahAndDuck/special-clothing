let req = new XMLHttpRequest();
let people = {}
getHundler()
function getHundler() {
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
      people = JSON.parse(req.responseText)
    }
  };

  req.open("GET", "https://api.jsonbin.io/v3/b/67a70a1be41b4d34e4863a42?meta=false >", true);
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  req.send();

}



document.querySelector('button').addEventListener('click', function () {
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      // console.log(req.responseText);

    }
  };

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  req.send('[{"name": "Иван","surname": "Сидоров","clothing-size": "s", "shoe-size": "42"}]');
})


document.querySelector('#get').addEventListener('click', getHundler)



document.querySelector('#update').addEventListener('click', function () {


  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      // console.log(req.responseText);
    }
  };
  const ID = people.record[people.record.length - 1]["id"]
  // console.log('ID', ID);
  let myObg =
  {
    "id": `${+ID + 1}`,
    "name": `${document.querySelector('#name').value}`,
    "surname": `${document.querySelector('#surname').value}`,
    "clothingSize": ` ${document.querySelector('#clothing-size').value}`,
    "shoeSize": ` ${document.querySelector('#shoe-size').value}`,
    "height": `${document.querySelector('#height').value}`

  }

  // console.log(myObg);

  // console.log('people.record', people.record);
  people.record.push(myObg)

  let json = JSON.stringify(people.record);
  // console.log('json', json);
  req.open("PUT", "https://api.jsonbin.io/v3/b/67a70a1be41b4d34e4863a42", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2a$10$CwZii0CvYjl6Oyy3BAo.Je8d8wngrMbHNREsVVa7dZ/pIDbQBh5N2");
  req.send(`${json}`);
  alert('отлично!во избежании путаницы пожалуйста больше не отправляй данные')

})





var form = document.getElementById('form')
var text = document.getElementById('text');
var result = document.getElementById('result');



function JSON2CSV() {
  var json = '';
  var index = [];
  var toCsv = [];
  var stringJson = '[\n';
  var valid = false;

  var texto = String(text.value);

  for ( i=0; i<texto.length; i++) {

    if (texto[i] == "'"  || texto[i] == '"' || texto[i] == '[' || texto[i] == ']' || texto[i] == '}' || texto[i] == '{') {
      valid = true;
    }
    if (texto[i] == "\n" || texto[i] == " " || texto[i] == "[" || texto[i] == "]") {

    } else {
      json += texto[i];
    }
 }

 index = json.split('},{');


  for (var i = 0; i < index.length; i++) {
    // DAR UM REPLACE DE : PARA ,
    toCsv.push(index[i].split(','));
    toCsv.push(index[i].split(':'));
  }
  console.log(toCsv);

//   for (var i = 1; i < toJson.length; i++) {
//     stringJson +='{';

//     for (var j = 0; j < toJson[0].length; j++) {
//       stringJson += '"' + toJson[0][j] + '":';
//       stringJson += '"' + toJson[i][j] + '"';
//       if (j != toJson[0].length - 1){
//         stringJson += ',';
//       }
//     }

//     if (i != toJson.length - 1){
//       stringJson += '},\n';
//     } else {
//       stringJson += '}\n]';
//     }
//   }

  if (valid == false){
    result.value = "INPUT INVALID !!"
  } else {
    result.value = index;
  }
}

function CSV2JSON() {
  var csv = '';
  var index = [];
  var toJson = [];
  var stringJson = '[\n';
  var valid = true;

  var texto = String(text.value);

  for ( i=0; i<texto.length; i++) {
    if (texto[i] == "'"  || texto[i] == '"' || texto[i] == '[' || texto[i] == ']' || texto[i] == '}' || texto[i] == '{') {
      valid = false;
    }
    if (texto[i] == "\n") {
      csv += '|||';
    } else {
      csv += texto[i];
    }
 }

 index = csv.split('|||');

  for (var i = 0; i < index.length; i++) {
    toJson.push(index[i].split(','));
  }

  for (var i = 1; i < toJson.length; i++) {
    stringJson +='{';

    for (var j = 0; j < toJson[0].length; j++) {
      stringJson += '"' + toJson[0][j] + '":';
      stringJson += '"' + toJson[i][j] + '"';
      if (j != toJson[0].length - 1){
        stringJson += ',';
      }
    }

    if (i != toJson.length - 1){
      stringJson += '},\n';
    } else {
      stringJson += '}\n]';
    }
  }

  if (valid == false){
    result.value = "INPUT INVALID !!"
  } else {
    result.value = stringJson;
  }
}
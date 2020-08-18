var form = document.getElementById('form')
var text = document.getElementById('text');
var result = document.getElementById('result');



function JSON2CSV() {
  var json = '';
  var index = [];
  var toCsv = [];
  var stringCsv = '';
  var stringCsv2 = '';
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

 json = json.replace(/:/g, ",");
 json = json.replace("{", "");
 json = json.replace(/},{/g, "|||");
 json = json.replace("}", "");
 index = json.split('|||');



  for (var i = 0; i < index.length; i++) {
    toCsv.push(index[i].split(','));
  }

  for (var i = 0; i < toCsv[0].length; i++) {
    if (i % 2 == 0){
      stringCsv += toCsv[0][i] +',';
    }
  }
  
  stringCsv += '|||';
  stringCsv = stringCsv.replace(",|||", "\n");

  for (var i = 0; i < toCsv.length; i++) {
    for (var j = 0; j < toCsv[i].length; j++) {
      if (j % 2 != 0){
        stringCsv += toCsv[i][j] +',';
      }
    }
    stringCsv += '|||';
    stringCsv = stringCsv.replace(",|||", "\n");
  }

    stringCsv += stringCsv2;

  if (valid == false){
    result.value = "INPUT INVALID !!"
  } else {
    result.value = stringCsv;
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


//  READ FILE

document.getElementById('file').onchange = function(){

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
    console.log(this.result);

    // By lines
    var lines = this.result;
    // for(var line = 0; line < lines.length; line++){
    //   console.log(lines[line]);
    // }
    text.value = lines;
  };
  reader.readAsText(file);
};
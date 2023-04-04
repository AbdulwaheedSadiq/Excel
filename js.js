
      // Method to upload a valid excel file
      function upload() {
        var files = document.getElementById('inputGroupFile02').files;
        if(files.length==0){
          alert("Please choose any file...");
          return;
        }
        var filename = files[0].name;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension == '.XLS' || extension == '.XLSX') {
            excelFileToJSON(files[0]);
        }else{
            alert("Please select a valid excel file.");
        }
      }
       
      //Method to read excel file and convert it into JSON 
      function excelFileToJSON(file){
          try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
 
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type : 'binary'
                });
                var result = {};
                workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
			
                    result[sheetName] = roa;
                }
				
				var pass = [];
				for (let i = 0; i < result[sheetName].length; i++) {
					pass.push(result[sheetName][i])
				}
				
				//console.log(pass);
				
				// Send the AJAX request
				$.ajax({
					type: "POST",
					url: "http://localhost:5147/api/excel",
					data: JSON.stringify(pass),
					contentType: "application/json",
					success: function(response) {
						// Handle success response
						console.log("successfull")
						subbmitted();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						// Handle error response
						alert("Not Successfull")
						console.log(errorThrown)
					}
				});
				
              });
			  
                }
            }catch(e){
                console.error(e);
            }
      }
function clickme(){
	const text = "thank you. Please Follow instructions carefull my friend. Put only single file so that data can be sent successfull. have a nice submissions"
	
	const voice = new SpeechSynthesisUtterance(text)
	
	window.speechSynthesis.speak(voice);
}

function subbmitted(){
	const text = "Congratulations. submissions successfull"
	
	const voice = new SpeechSynthesisUtterance(text)
	
	window.speechSynthesis.speak(voice);
}
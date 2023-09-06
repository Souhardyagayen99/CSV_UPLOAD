//This function check that file type is .csv or not
    function checkFileType() {
        let file = document.getElementById('file');
        console.log(file.value);
        if(isCsv(file.value)){
            // alert('Hello');
        }
        else{
            alert('Only .csv is allowed')
            return false;
        }
        console.log('Hello');
        window.setInterval(() => {
            console.log("Hello");

        }, 500000);
        // alert("Hello");
        return true;
    }
    //This function check that file is csv file or not
    function isCsv(js) {
        const ext = ['.csv'];
        return ext.some(el => js.endsWith(el));
    }

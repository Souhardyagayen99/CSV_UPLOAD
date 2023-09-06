console.log('Im in');
         

document.getElementById("search-btn").addEventListener("click", searchTable);
//This function help to filter the table
function searchTable() {
    console.log('click');
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("input-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        for (j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    
    
}
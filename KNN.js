
function nearestNeighbors(){
    let k = document.getElementById('kNumber').value
    if (!(k>=1)){
        alert(`Select a positive number for K above 0`);
        return;
    }
    if( k > content.length - 1){
        alert(`Only K = ${content.length - 1} were selected`)
        k = content.length - 1}

    const lastRow = content[content.length - 1];
    let nonMarkedColums = []
    for (let i = 0; i < headers.length; i++) {
        if (!approvedMarks.includes(headers[i])) {
            nonMarkedColums.push(headers[i]);
        }
    }

    //Loop through the rows of the file
    let KNN = [];
    for (let i = 0; i < content.length-1; i++) {
        let sum = 0;
        const row = content[i];
        //Multiple the columns of the row with non ? values and the last row and add them together
        //Choose the k largest sum rows
        for (let j = 0; j < nonMarkedColums.length; j++) {
            sum += row[nonMarkedColums[j]] * lastRow[nonMarkedColums[j]]; 
        }
        if (KNN.length < k){
            KNN.push({
                row: row,
                value: sum,
                num: i + 1
            })
        }
        else{
            KNN.push({
                row: row,
                value: sum,
                num: i + 1
            })
            KNN.sort((a, b) => b.value - a.value);
            KNN.pop();
        };
    }
    //Loop through the columns with the ? values
    let result = [];
    //From the chosen rows look add the numbers of each respected column and the largest column is the chosen attribiute
    for (let i = 0; i < approvedMarks.length; i++) {
        let rowSring = "";
        let sum = 0
        for(let j = 0; j<KNN.length; j++){
            sum += parseFloat(KNN[j].row[approvedMarks[i]])
            rowSring += ` ${KNN[j].num},`
        }
        rowSring = rowSring.slice(0, -1);
        result.push({
            name: approvedMarks[i],
            value: sum,
            rows: rowSring,
        });      
    }
    result.sort((a, b) => b.value - a.value);

    let string = "";
    for (let i = 0; i < approvedMarks.length; i++) {
        string += ` ${result[i].name},`
        if((i<approvedMarks.length-1) && (result[i].value === result[i+1].value)){continue}
        else{break};
    }
    string = string.slice(0, -1);
    alert(`Recommended Attributes:${string}\n based on the nearest neighbors:${result[0].rows}`)
}
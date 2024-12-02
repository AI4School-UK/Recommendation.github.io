
function nearestNeighbors(){
    let k = document.getElementById('kNumber').value
    if (!(k>=1)){
        alert(`Select a positive number for K above 0`);
        return;
    }
    if( k > content.length - 1){ k = content.length - 1}
    const lastRow = content[content.length - 1];
    let nonMarkedColums = []
    for (let i = 0; i < headers.length; i++) {
        if (!approvedMarks.includes(headers[i])) {
            nonMarkedColums.push(headers[i]);
        }
    }

    let KNN = [];
    for (let i = 0; i < content.length-1; i++) {
        let sum = 0;
        const row = content[i];
        
        for (let j = 0; j < nonMarkedColums.length; j++) {
            sum += row[nonMarkedColums[j]] * lastRow[nonMarkedColums[j]];
        }
        if (KNN.length < k){
            KNN.push({
                row: row,
                value: sum,
            })
        }
        else{
            KNN.push({
                row: row,
                value: sum,
            })
            KNN.sort((a, b) => b.value - a.value);
            KNN.pop();
        };
    }

    let result = [];
    for (let i = 0; i < approvedMarks.length; i++) {
        let sum = 0
        for(let j = 0; j<KNN.length; j++){
            sum += parseFloat(KNN[j].row[approvedMarks[i]])
        }
        result.push({
            name: approvedMarks[i],
            value: sum,
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
    alert(`Recommended Attributes:${string}`)
}
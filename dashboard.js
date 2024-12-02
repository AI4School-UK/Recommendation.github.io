let headers;
let content;
let approvedMarks = []

document.getElementById('filePicker').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    let marks = []
    const file = event.target.files[0];
    if (!file || file.type !== "text/csv") {
        alert("Please upload a valid CSV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        content = Papa.parse(fileContent, { header: true }).data;
        headers = Object.keys(content[0]);

        while(true){
            const checkLast = content[content.length - 1];
            if (Object.values(checkLast).every(value => value.trim() === '')) {
                content.pop();
            }
            else{break}
        }

        let num = 2
        for (let i = 0; i < content.length - 1; i++) {
            const row = content[i];
            for (let j = 0; j < headers.length; j++) {
                const column = headers[j];
                if (!(row[column] >= 0) || isNaN(row[column]) || row[column] ==="") {
                    alert(`Invalid data on row: ${num} Column: ${column}`);
                    return;
                }
            }
            num += 1;
        }

        const lastRow = content[content.length - 1];
        let questionMark = 0

        for (let i = 0; i < headers.length; i++) {
            const column = headers[i];
            if(!(lastRow[column]>=0) || (isNaN(lastRow[column]))){
                if(!(lastRow[column]==='?')){
                    alert(`Invalid data on Last row Column: ${column}`)
                    return;
                }
                marks.push(column)
                questionMark += 1
            }
        }

        if(questionMark===0){
            alert("No ? values on last row")
            return;
        }
        if(questionMark===headers.length){
            alert("No values on last row")
            return;
        }
        approvedMarks = marks
        
        const table = document.getElementById('table');
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');
    
      
        thead.innerHTML = '';
        tbody.innerHTML = '';
    
        const headerRow = document.createElement('tr');

        const th = document.createElement('th');
        th.textContent = "Row";
        headerRow.appendChild(th);

        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
    
    
        content.forEach((row, index) => {
          const tr = document.createElement('tr');
    
          const tdIndex = document.createElement('td');
          tdIndex.textContent = index + 1;
          tr.appendChild(tdIndex);
    
      
          headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
          });
    
          tbody.appendChild(tr);
        });
    };

  reader.onerror = function() {
    alert(`Error reading file: ${file.name}`);
  };

  reader.readAsText(file);
});


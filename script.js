let groups = undefined;
let groupTable = document.getElementById("groupTable");
const NUM_GROUPS = 36;

function updateTableHighlighting() {
  if (!groups) { return; }

  groups.forEach(function(group) {
    let tableCell = getTableGroup(group.groupNum);

    if (group.needsHelp) {
      tableCell.style.backgroundColor = "red";
    } else {
      tableCell.style.backgroundColor = "white";
    }
  });
  

  // debug
  console.log(groups);
}

function getTableGroup(groupNum) {
  /*let numRows = groupTable.rows.length;
  let numCols = groupTable.rows[0].cells.length;

  return groupTable.rows[groupNum % numRows].cells.item(groupNum / numCols);*/

  return document.getElementById("groupCell" + groupNum);
}


// source
// https://stackoverflow.com/a/51854096
const getGroups = async () => {
  console.log("Polling API for updated group data...");
  const response = await fetch('http://localhost:4000/tickets');
  const myJSON = await response.json(); //extract JSON from the http response
  groups = myJSON;
  updateTableHighlighting();
  console.log("Groups updated.");
}

function refresh() {


  getGroups();
  setTimeout(refresh, 5000);
}

refresh();

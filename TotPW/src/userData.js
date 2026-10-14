function loadData() {
    if (getItem('dataExists') === true) {
        storeItem('dataExists', false);
    }
    else {
        storeItem('dataExists', true);
        state = 'DATAINPUT';
    }
}

function saveData() {

}